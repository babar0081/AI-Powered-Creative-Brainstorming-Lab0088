
from langchain_community.tools import DuckDuckGoSearchResults
search_tool = DuckDuckGoSearchResults()
search_tool.name = "Internet Search"
search_tool.description = "A real-time search engine. Use this to find current events, facts, data, market trends, and any other up-to-date information."