from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from models import Base

# SQLite database file (will be created automatically)
SQLALCHEMY_DATABASE_URL = "sqlite:///./bizbuddy.db"

# Create engine
engine = create_engine(
    SQLALCHEMY_DATABASE_URL, 
    connect_args={"check_same_thread": False}  # Needed for SQLite
)

# Create session factory
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Create all tables
def init_db():
    """Initialize database - create all tables"""
    Base.metadata.create_all(bind=engine)
    print("✅ Database initialized successfully!")

# Dependency to get database session
def get_db():
    """Get database session for API endpoints"""
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()