from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from datetime import timedelta
import pandas as pd
from sentence_transformers import SentenceTransformer, util
import os

# Import our modules
from database import get_db, init_db
from models import User, Contact
from schemas import UserRegister, UserLogin, UserResponse, LoginResponse
from auth import create_access_token, verify_token, ACCESS_TOKEN_EXPIRE_MINUTES

# Import chatbot schemas
from pydantic import BaseModel, field_validator, EmailStr, Field
from typing import Optional
from datetime import datetime

# =============================================
# Chatbot Request Schema
# =============================================
class QuestionRequest(BaseModel):
    field: str
    question: str

    @field_validator("question")
    @classmethod
    def question_must_not_be_empty(cls, v):
        if not v.strip():
            raise ValueError("Question cannot be empty")
        return v

# =============================================
# Contact Form Schemas
# =============================================
class ContactCreate(BaseModel):
    name: str = Field(..., min_length=2, max_length=100)
    email: EmailStr
    subject: str = Field(..., min_length=3, max_length=200)
    message: str = Field(..., min_length=10, max_length=2000)

class ContactResponse(BaseModel):
    id: int
    name: str
    email: str
    subject: str
    message: str
    is_read: bool
    created_at: Optional[datetime] = None

    class Config:
        from_attributes = True

# =============================================
# Initialize FastAPI App
# =============================================
app = FastAPI(
    title="BizBuddy API",
    description="Business Consultation Chatbot with Authentication & Contact Form",
    version="4.0"
)

# =============================================
# CORS Configuration (Updated for deployment)
# =============================================
# Get frontend URL from environment variable (for production)
FRONTEND_URL = os.getenv("FRONTEND_URL", "http://localhost:5173")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        FRONTEND_URL,
        "http://localhost:5173",
        "http://localhost:5174",
        "http://127.0.0.1:5173",
        "https://*.vercel.app",  # Allow all Vercel preview deployments
        "*",  # Allow all (remove in production for better security)
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# =============================================
# Initialize Database on Startup
# =============================================
@app.on_event("startup")
def startup_event():
    init_db()
    print("🚀 BizBuddy API started successfully!")
    print(f"📡 Accepting requests from: {FRONTEND_URL}")

# =============================================
# Chatbot Setup
# =============================================
def keyword_boost(user_question: str, keywords: str):
    boost = 0.0
    user_question = user_question.lower()
    for kw in keywords.split(","):
        kw = kw.strip().lower()
        if kw and kw in user_question:
            boost += 0.05
    return boost

# Load Dataset
try:
    data = pd.read_csv("Marketing_QA_Dataset.csv")
    data["question"] = data["question"].astype(str)
    data["keywords"] = data["keywords"].astype(str)
    data["answer"] = data["answer"].astype(str)
    data["field"] = data["field"].astype(str)
    data["combined_text"] = data["question"] + " " + data["keywords"]
    print(f"✅ Dataset loaded: {len(data)} Q&A pairs")
except Exception as e:
    print(f"❌ Error loading dataset: {e}")
    data = pd.DataFrame()

# Load AI Model
try:
    model = SentenceTransformer("all-MiniLM-L6-v2")
    question_embeddings = model.encode(
        data["combined_text"].tolist(),
        convert_to_tensor=True,
        normalize_embeddings=True
    )
    print("✅ AI Model loaded successfully")
except Exception as e:
    print(f"❌ Error loading model: {e}")

SIMILARITY_THRESHOLD = 0.45

# =============================================
# Authentication Endpoints
# =============================================

@app.post("/api/auth/register", response_model=UserResponse, status_code=status.HTTP_201_CREATED)
def register_user(user_data: UserRegister, db: Session = Depends(get_db)):
    """Register a new user"""
    
    existing_user = db.query(User).filter(User.username == user_data.username).first()
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Username already registered"
        )
    
    existing_email = db.query(User).filter(User.email == user_data.email).first()
    if existing_email:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered"
        )
    
    new_user = User(
        username=user_data.username,
        email=user_data.email,
        password_hash=User.hash_password(user_data.password)
    )
    
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    
    return new_user

@app.post("/api/auth/login", response_model=LoginResponse)
def login_user(user_data: UserLogin, db: Session = Depends(get_db)):
    """Login user and return JWT token"""
    
    user = db.query(User).filter(User.email == user_data.email).first()
    
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password"
        )
    
    if not user.verify_password(user_data.password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password"
        )
    
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user.username},
        expires_delta=access_token_expires
    )
    
    return {
        "access_token": access_token,
        "token_type": "bearer",
        "user": user
    }

@app.get("/api/auth/me", response_model=UserResponse)
def get_current_user(token: str, db: Session = Depends(get_db)):
    """Get current logged-in user info"""
    
    username = verify_token(token)
    if not username:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or expired token"
        )
    
    user = db.query(User).filter(User.username == username).first()
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )
    
    return user

# =============================================
# Contact Form Endpoints
# =============================================

@app.post("/api/contact", response_model=ContactResponse, status_code=status.HTTP_201_CREATED)
def submit_contact_form(contact_data: ContactCreate, db: Session = Depends(get_db)):
    """Submit a contact form message"""
    
    new_contact = Contact(
        name=contact_data.name,
        email=contact_data.email,
        subject=contact_data.subject,
        message=contact_data.message
    )
    
    db.add(new_contact)
    db.commit()
    db.refresh(new_contact)
    
    print(f"✉️ New contact message from: {contact_data.name} ({contact_data.email})")
    
    return new_contact

@app.get("/api/contact/messages")
def get_all_messages(db: Session = Depends(get_db)):
    """Get all contact messages (admin only - add auth later)"""
    
    messages = db.query(Contact).order_by(Contact.created_at.desc()).all()
    return {"messages": [msg.to_dict() for msg in messages], "total": len(messages)}

# =============================================
# Chatbot Endpoint
# =============================================

@app.post("/chat")
def chat(request: QuestionRequest):
    """Chatbot endpoint - answer business questions"""
    
    query_embedding = model.encode(
        request.question,
        convert_to_tensor=True,
        normalize_embeddings=True
    )

    similarities = util.cos_sim(
        query_embedding,
        question_embeddings
    )[0]

    best_score = 0.0
    best_index = -1

    for idx, base_score in enumerate(similarities):
        if data.iloc[idx]["field"].lower() != request.field.lower():
            continue

        boost = keyword_boost(
            request.question,
            data.iloc[idx]["keywords"]
        )

        final_score = min(base_score.item() + boost, 1.0)

        if final_score > best_score:
            best_score = final_score
            best_index = idx

    if best_index == -1 or best_score < SIMILARITY_THRESHOLD:
        return {
            "answer": "I'm sorry, I couldn't find a suitable answer. Please try rephrasing your question."
        }

    return {
        "user_question": request.question,
        "detected_field": request.field,
        "confidence": round(best_score, 2),
        "answer": data.iloc[best_index]["answer"]
    }

# =============================================
# Health Check
# =============================================

@app.get("/")
def health_check():
    """API health check"""
    return {
        "status": "BizBuddy API is running",
        "version": "4.0",
        "environment": os.getenv("RAILWAY_ENVIRONMENT", "development"),
        "features": ["authentication", "chatbot", "contact_form"],
        "endpoints": [
            "/api/auth/register",
            "/api/auth/login",
            "/api/auth/me",
            "/api/contact",
            "/api/contact/messages",
            "/chat"
        ]
    }

# =============================================
# For local development
# =============================================
if __name__ == "__main__":
    import uvicorn
    port = int(os.getenv("PORT", 8000))
    uvicorn.run("app:app", host="0.0.0.0", port=port, reload=True)