# Backend/main.py (FINAL, ROBUST STREAMING FIX)
import os
import json
import asyncio
from dotenv import load_dotenv
load_dotenv()
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
from graph.agent_graph import agent_graph
from logger_config import debug_logger, errors_logger

app = FastAPI(
    title="AI Brainstorming Lab Backend",
    description="API for orchestrating a multi-agent debate for brainstorming ideas.",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

async def stream_brainstorm_events(idea: str):
    """
    Yeh function ab streaming ke baghair kaam karega.
    Pehle graph ka poora result aayega, phir hum use ek-ek karke frontend ko bhejenge.
    """
    initial_state = {"input": idea, "messages": [], "turn_count": 0}
    
    try:
        # Step 1: `astream_log` ki jagah `ainvoke` istemal karein
        # Yeh poora graph chalayega aur akhir mein ek final result dega
        debug_logger.info("Running agent graph with .ainvoke (non-streaming)...")
        final_state = await agent_graph.ainvoke(initial_state)
        debug_logger.info(f"Graph finished. Final state: {final_state}")
        
        # Step 2: Final result se messages nikaalein
        final_messages = final_state.get("messages", [])
        
        # Step 3: Har message ko ek-ek karke frontend ko bhejein
        for message_text in final_messages:
            agent_name = "System"
            response_text = message_text

            if ":" in message_text:
                parts = message_text.split(":", 1)
                agent_name = parts[0].strip()
                response_text = parts[1].strip()

            # 'start' event bhejein
            start_event = {"event": "start", "sender": agent_name}
            yield f"data: {json.dumps(start_event)}\n\n"
            await asyncio.sleep(0.05) 

            # 'chunk' event mein poora text bhejein
            chunk_event = {"event": "chunk", "text": response_text}
            yield f"data: {json.dumps(chunk_event)}\n\n"
            await asyncio.sleep(0.05)

            # 'end' event bhejein
            yield f"data: {json.dumps({'event': 'end'})}\n\n"
            await asyncio.sleep(0.05)
            
    except Exception as e:
        errors_logger.error(f"Error during non-streaming execution: {e}", exc_info=True)
        error_event = {"event": "error", "message": f"An error occurred in the AI debate: {str(e)}"}
        yield f"data: {json.dumps(error_event)}\n\n"
    
    finally:
        # Stream ke akhir mein 'final_end' event bhejein
        final_end_event = {"event": "final_end"}
        yield f"data: {json.dumps(final_end_event)}\n\n"
        debug_logger.info("Non-streaming process finished successfully.")
@app.get("/")
def read_root():
    return {"message": "AI Brainstorming Lab Backend is running!"}

@app.get("/brainstorm")
async def run_brainstorming(idea: str):
    debug_logger.info(f"Received new streaming request for idea: '{idea}'")
    try:
        if not idea or not idea.strip():
            raise HTTPException(status_code=400, detail="Idea cannot be empty...")
        if len(idea.split()) < 3:
            raise HTTPException(status_code=400, detail="Your idea is too short...")
        debug_logger.info("Starting StreamingResponse...")
        response = StreamingResponse(stream_brainstorm_events(idea), media_type="text/event-stream")
        response.headers["Cache-Control"] = "no-cache"
        response.headers["Connection"] = "keep-alive"
        return response
    except Exception as e:
        debug_logger.error(f"Error in run_brainstorming: {str(e)}")
        raise

