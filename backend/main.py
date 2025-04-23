from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Dict, Any, Optional
from langchain.chains import LLMChain
from langchain.prompts import PromptTemplate
from langchain.memory import ConversationBufferMemory
from langchain.llms.fake import FakeListLLM

app = FastAPI()

# Configure CORS to allow requests from the frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Adjust in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Define the request and response models
class ChatMessage(BaseModel):
    role: str
    content: str

class ChatRequest(BaseModel):
    messages: List[ChatMessage]

class ChatResponse(BaseModel):
    response: str

# Define our knowledge base about the Glow-in-the-Dark Widget
KNOWLEDGE_BASE = {
    "what color is it": "The Glow-in-the-Dark Widget comes in a phosphorescent green color when charged, but appears white in daylight.",
    "does it need batteries": "No, the Glow-in-the-Dark Widget doesn't need batteries. It absorbs light energy during the day and glows for up to 8 hours at night.",
    "where can i get one": "You can purchase the Glow-in-the-Dark Widget from our online store at www.glowwidget.com or from select retailers nationwide."
}

# Simple response function that checks for exact matches
def get_widget_response(question: str) -> str:
    # Convert to lowercase and remove punctuation for better matching
    normalized_question = question.lower().rstrip('?!.,;:')
    
    for known_question, answer in KNOWLEDGE_BASE.items():
        if normalized_question == known_question or normalized_question in known_question:
            return answer
    
    return "I'm sorry, I don't have information about that aspect of the Glow-in-the-Dark Widget. Would you like to know about its color, battery requirements, or where to purchase it?"

# Create a FakeListLLM to use with LangChain
responses = ["I'll check my knowledge base about that."]
fake_llm = FakeListLLM(responses=responses)

# Create a prompt template
template = """
You are a helpful assistant answering questions about the Glow-in-the-Dark Widget.

User: {question}
Assistant:"""

prompt = PromptTemplate(
    input_variables=["question"],
    template=template
)

# Create a chain
memory = ConversationBufferMemory()
chain = LLMChain(llm=fake_llm, prompt=prompt, memory=memory)

@app.get("/")
async def root():
    return {"message": "Glow-in-the-Dark Widget Chatbot API"}

@app.post("/chat", response_model=ChatResponse)
async def chat(request: ChatRequest):
    if not request.messages:
        raise HTTPException(status_code=400, detail="No messages provided")
    
    # Get the last user message
    last_user_message = next((msg.content for msg in reversed(request.messages) 
                             if msg.role.lower() == "user"), None)
    
    if not last_user_message:
        raise HTTPException(status_code=400, detail="No user message found")
    
    # Get response based on our simple knowledge base
    response = get_widget_response(last_user_message)
    
    return ChatResponse(response=response) 