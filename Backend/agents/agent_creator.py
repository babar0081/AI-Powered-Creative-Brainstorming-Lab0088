
import os
from langchain_core.prompts import ChatPromptTemplate
from langchain_openai import ChatOpenAI
from langchain_core.output_parsers import StrOutputParser

# Step 1: LLM ko define karein (non-streaming ke saath)
llm = ChatOpenAI(
    model="gpt-5",
    openai_api_key=os.getenv("OPENAI_API_KEY"),
    streaming=False,  # <-- YEH SABSE ZAROORI HAI
    model_kwargs={
        "reasoning_effort": "low"
    }
)

# Step 2: Har agent ko ek simple LCEL chain banayein

# Optimist Agent
optimist_prompt = ChatPromptTemplate.from_messages([
    ("system", "You are an enthusiastic and optimistic visionary..."),
    ("human", "{input}"),
])
optimist_agent = optimist_prompt | llm | StrOutputParser()

# Critic Agent
critic_prompt = ChatPromptTemplate.from_messages([
    ("system", "You are a sharp and pragmatic risk analyst..."),
    ("human", "{input}"),
])
critic_agent = critic_prompt | llm | StrOutputParser()

# Query Generator
query_gen_prompt = ChatPromptTemplate.from_messages([
    ("system", "You are a research assistant... Output ONLY the search query..."),
    ("human", "{input}")
])
query_generator = query_gen_prompt | llm | StrOutputParser()

# Analyst Agent
analyst_prompt = ChatPromptTemplate.from_messages([
    ("system", "You are a neutral and data-driven adjudicator..."),
    ("human", "Here is the debate:\n{debate}\n\nHere are the real-time search results (in JSON format):\n{search_results}"),
])
analyst_agent = analyst_prompt | llm | StrOutputParser()

# Moderator Agent
moderator_prompt = ChatPromptTemplate.from_messages([
    ("system", "You are a wise and experienced project moderator..."),
    ("human", "{input}"),
])
moderator_agent = moderator_prompt | llm | StrOutputParser()