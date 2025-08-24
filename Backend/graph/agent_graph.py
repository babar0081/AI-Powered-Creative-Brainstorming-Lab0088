# Backend/graph/agent_graph.py (TOTAL NEW AND CORRECTED CODE)

from typing import TypedDict, Annotated, Optional
from langchain_core.messages import AIMessage

from langgraph.graph import StateGraph, END
from agents.agent_creator import optimist_agent, critic_agent, analyst_agent, moderator_agent, query_generator
from tools.search_tool import search_tool
from logger_config import responses_logger, errors_logger, debug_logger 

MAX_TURNS = 1

class AgentState(TypedDict):
    input: str
    messages: Annotated[list, lambda x, y: x + y]
    turn_count: Optional[int]
    search_query: Optional[str]
    search_results: Optional[str]

# --- NODE FUNCTIONS (UPDATED FOR SIMPLE CHAINS) ---

async def optimist_node(state):
    debug_logger.info("--- Running Optimist Agent ---")
    context = f"The user's idea is: '{state['input']}'.\n\nIt's your turn, Optimist. Provide an enthusiastic and positive take on this idea."
    try:
        response_text = await optimist_agent.ainvoke({"input": context})
        output = f"Optimist: {response_text}"
        responses_logger.info(output)
        return {"messages": [output]}


    except Exception as e:
        errors_logger.error(f"Error in Optimist: {e}", exc_info=True)
        return {"messages": ["Optimist: I encountered an error and couldn't process the idea."]}

async def critic_node(state):
    debug_logger.info("--- Running Critic Agent ---")
    history = "\n".join(state['messages'])
    context = f"The user's idea is: '{state['input']}'.\nThe conversation so far:\n{history}\n\nIt's your turn, Critic. Provide respectful counter-arguments to the Optimist's points."
    try:
        response_text = await critic_agent.ainvoke({"input": context})
        output = f"Critic: {response_text}"
        responses_logger.info(output)
        return {"messages": [output]}
    except Exception as e:
        errors_logger.error(f"Error in Critic: {e}", exc_info=True)
        return {"messages": ["Critic: I encountered an error and couldn't provide a critique."]}

async def generate_query_node(state):
    debug_logger.info("--- Generating Search Query ---")
    history = "\n".join(state['messages'])
    context = f"Original Idea: {state['input']}\n\nDebate so far:\n{history}"
    try:
        # CHANGE: The chain now directly returns the query string.
        query_text = await query_generator.ainvoke({"input": context})
        query_text = query_text.strip().replace('"', '')
        debug_logger.info(f"Generated Query: {query_text}")
        return {"search_query": query_text}
    except Exception as e:
        errors_logger.error(f"Error in Query Generation: {e}", exc_info=True)
        return {"search_query": state['input']}

async def perform_search_node(state):
    """Performs the web search and returns the raw string result."""
    query = state['search_query']
    if not query:
        return {"search_results": "No search query was generated."}
    debug_logger.info(f"--- Performing Search for: '{query}' ---")
    try:
        results_string = await search_tool.ainvoke(query)
        debug_logger.info(f"Search Results (Raw String): {results_string[:300]}...")
        return {"search_results": results_string}
    except Exception as e:
        errors_logger.error(f"Error during search: {e}", exc_info=True)
        return {"search_results": "Search failed. No results found."}

async def analyst_node(state):
    debug_logger.info("--- Running Analyst (Synthesizer) Agent ---")
    debate_context = "\n".join(state['messages'])
    search_results = state.get('search_results', 'N/A')
    
    context = {"debate": debate_context, "search_results": search_results}

    if "no results found" in str(search_results).lower() or not search_results:
        context['search_results'] = "N/A"
        debug_logger.warning("Search failed or returned no results. Analyst running in fallback mode.")
    
    try:
        # CHANGE: The agent now directly returns a string.
        response_text = await analyst_agent.ainvoke(context)
        output = f"Analyst: {response_text}"
        responses_logger.info(output)
        return {"messages": [output]}
    except Exception as e:
        errors_logger.error(f"Error in Analyst: {e}", exc_info=True)
        return {"messages": ["Analyst: I encountered an error while analyzing the search results."]}

async def moderator_node(state):
    debug_logger.info("--- Running Moderator Agent ---")
    history = "\n".join(state['messages'])
    context = f"The user's idea is: '{state['input']}'.\nThe full debate is:\n{history}\n\nIt's your turn, Moderator. Provide a final summary, recommendation, and next steps."
    try:
        # CHANGE: The agent now directly returns a string.
        response_text = await moderator_agent.ainvoke({"input": context})
        output = f"Moderator: {response_text}"
        responses_logger.info(output)
        return {"messages": [output]}
    except Exception as e:
        errors_logger.error(f"Error in Moderator: {e}", exc_info=True)
        return {"messages": ["Moderator: I encountered an error and couldn't summarize the debate."]}

def should_continue(state):
    turn = state.get('turn_count', 0)
    if turn >= MAX_TURNS:
        return "moderator"
    return "optimist"

def after_analyst(state):
    state['turn_count'] = state.get('turn_count', 0) + 1
    return state
    
# --- GRAPH DEFINITION (No changes here) ---
workflow = StateGraph(AgentState)

workflow.add_node("optimist", optimist_node)
workflow.add_node("critic", critic_node)
workflow.add_node("generate_query", generate_query_node)
workflow.add_node("perform_search", perform_search_node)
workflow.add_node("analyst", analyst_node)
workflow.add_node("moderator", moderator_node)
workflow.add_node("after_analyst_router", after_analyst)

workflow.set_entry_point("optimist")
workflow.add_edge("optimist", "critic")
workflow.add_edge("critic", "generate_query")
workflow.add_edge("generate_query", "perform_search")
workflow.add_edge("perform_search", "analyst")
workflow.add_edge("analyst", "after_analyst_router")
workflow.add_conditional_edges(
    "after_analyst_router",
    should_continue,
    {"moderator": "moderator", "optimist": "optimist"}
)
workflow.add_edge("moderator", END)

agent_graph = workflow.compile()