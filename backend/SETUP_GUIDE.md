# 🚀 Backend Authentication Setup Guide

## 📁 File Structure

Your backend folder should look like this:

```
backend/
├── app.py                      # Replace with app_with_auth.py
├── models.py                   # NEW - Database models
├── database.py                 # NEW - Database connection
├── auth.py                     # NEW - JWT utilities
├── schemas.py                  # NEW - Pydantic schemas
├── requirements.txt            # REPLACE - Updated dependencies
├── Marketing_QA_Dataset.csv    # Existing chatbot dataset
├── bizbuddy.db                 # Will be created automatically
└── venv/                       # Your virtual environment
```

## 🔧 Installation Steps

### Step 1: Backup Your Current Files
```bash
cd "C:\AI Powered Smart Business Toolkit\Business Consultation Chatbot\backend"

# Backup current app.py
copy app.py app_old.py
```

### Step 2: Replace Files

1. **Replace `app.py`** with `app_with_auth.py` (rename it to `app.py`)
2. **Add NEW files**: `models.py`, `database.py`, `auth.py`, `schemas.py`
3. **Replace `requirements.txt`** with the updated version

### Step 3: Install New Dependencies

```bash
# Activate virtual environment
.\venv\Scripts\Activate.ps1

# Install new packages
pip install sqlalchemy==2.0.25
pip install passlib[bcrypt]==1.7.4
pip install python-jose[cryptography]==3.3.0
pip install python-multipart==0.0.6
pip install email-validator==2.1.0

# Or install all at once from requirements.txt
pip install -r requirements.txt
```

### Step 4: Run the Server

```bash
# Make sure you're in the backend folder and venv is activated
uvicorn app:app --reload
```

You should see:
```
✅ Database initialized successfully!
✅ Dataset loaded: 400+ Q&A pairs
✅ AI Model loaded successfully
🚀 BizBuddy API started successfully!
INFO:     Uvicorn running on http://127.0.0.1:8000
```

### Step 5: Test the API

Open your browser and go to:
- **API Docs**: http://localhost:8000/docs
- **Health Check**: http://localhost:8000/

You should see:
```json
{
  "status": "BizBuddy API is running",
  "version": "3.0",
  "features": ["authentication", "chatbot"],
  "endpoints": [
    "/api/auth/register",
    "/api/auth/login",
    "/api/auth/me",
    "/chat"
  ]
}
```

## 🧪 Testing Authentication with Swagger UI

### Test 1: Register a New User

1. Go to http://localhost:8000/docs
2. Find `POST /api/auth/register`
3. Click "Try it out"
4. Enter test data:
```json
{
  "username": "testuser",
  "email": "test@example.com",
  "password": "Test@123"
}
```
5. Click "Execute"

**Expected Response (201 Created):**
```json
{
  "id": 1,
  "username": "testuser",
  "email": "test@example.com",
  "created_at": "2025-02-20T10:30:00"
}
```

### Test 2: Login

1. Find `POST /api/auth/login`
2. Click "Try it out"
3. Enter credentials:
```json
{
  "email": "test@example.com",
  "password": "Test@123"
}
```
4. Click "Execute"

**Expected Response (200 OK):**
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "token_type": "bearer",
  "user": {
    "id": 1,
    "username": "testuser",
    "email": "test@example.com",
    "created_at": "2025-02-20T10:30:00"
  }
}
```

### Test 3: Test Chatbot (Still Works!)

1. Find `POST /chat`
2. Enter:
```json
{
  "field": "Marketing",
  "question": "How can I increase social media engagement?"
}
```
3. Click "Execute"

**Expected Response:**
```json
{
  "user_question": "How can I increase social media engagement?",
  "detected_field": "Marketing",
  "confidence": 0.87,
  "answer": "Increasing social media engagement requires consistent posting..."
}
```

## 🗄️ Database Information

- **Database Type**: SQLite
- **File Location**: `backend/bizbuddy.db`
- **Created Automatically**: Yes (on first run)

### View Database (Optional)

You can use DB Browser for SQLite to view the database:
1. Download: https://sqlitebrowser.org/
2. Open `bizbuddy.db`
3. View the `users` table

## ✅ Verification Checklist

- [ ] All new Python files added to backend folder
- [ ] New dependencies installed successfully
- [ ] Server starts without errors
- [ ] Database file `bizbuddy.db` created
- [ ] Can register new user via Swagger UI
- [ ] Can login and receive JWT token
- [ ] Chatbot still works (`/chat` endpoint)

## 🐛 Troubleshooting

### Error: "ModuleNotFoundError: No module named 'sqlalchemy'"
**Solution**: Run `pip install -r requirements.txt`

### Error: "ModuleNotFoundError: No module named 'passlib'"
**Solution**: Run `pip install passlib[bcrypt]`

### Error: "ModuleNotFoundError: No module named 'jose'"
**Solution**: Run `pip install python-jose[cryptography]`

### Error: "Unable to open database file"
**Solution**: Make sure you have write permissions in the backend folder

### Server starts but no database file created
**Solution**: Check console for error messages. The database will be created on first request.

## 🎯 What's Next?

After backend is working:
1. Update frontend to call these new endpoints
2. Store JWT token in localStorage
3. Show logged-in user info in navbar
4. Protect chatbot (only logged-in users can use it)

## 📝 Password Requirements

The system enforces strong passwords:
- ✅ Minimum 8 characters
- ✅ At least 1 uppercase letter
- ✅ At least 1 lowercase letter
- ✅ At least 1 number
- ✅ At least 1 special character (!@#$%^&*...)

Example valid passwords:
- `Test@123`
- `Secure#Pass2024`
- `MyP@ssw0rd`

## 🔐 Security Notes

**IMPORTANT**: The `SECRET_KEY` in `auth.py` is for development only.

For production, generate a secure key:
```bash
# In Python
import secrets
print(secrets.token_hex(32))
```

Then replace the SECRET_KEY in `auth.py` with the generated value.

## ✨ Success!

If you can register, login, and receive a JWT token, your authentication system is working! 🎉

Next step: Connect the frontend to these endpoints.