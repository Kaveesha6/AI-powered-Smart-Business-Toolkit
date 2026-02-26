import requests
import pandas as pd

# Load the CSV to inspect it
print("="*60)
print("CHECKING CSV FILE")
print("="*60)

try:
    data = pd.read_csv("Marketing_QA_Dataset.csv")
    print(f"\n✓ CSV loaded successfully")
    print(f"Total rows: {len(data)}")
    print(f"\nColumns: {data.columns.tolist()}")
    
    # Clean and show fields
    data["field"] = data["field"].str.strip().str.lower()
    print(f"\nUnique fields: {data['field'].unique().tolist()}")
    
    # Show first few rows
    print(f"\n{'='*60}")
    print("FIRST 5 ROWS:")
    print(f"{'='*60}")
    for i in range(min(5, len(data))):
        print(f"\nRow {i+1}:")
        print(f"  Field: {data.iloc[i]['field']}")
        print(f"  Question: {data.iloc[i]['question']}")
        print(f"  Keywords: {data.iloc[i]['keywords']}")
        print(f"  Answer: {data.iloc[i]['answer'][:100]}...")
    
except FileNotFoundError:
    print("❌ Error: Marketing_QA_Dataset.csv not found!")
    print("Please make sure the CSV file is in the same directory as this script.")
    exit(1)

# Test API calls
print(f"\n{'='*60}")
print("TESTING API")
print(f"{'='*60}")

API_URL = "http://127.0.0.1:8000/chat"

# Get the first question from the CSV to test
if len(data) > 0:
    test_field = data.iloc[0]['field']
    test_question = data.iloc[0]['question']
    
    print(f"\nTest 1: Using first question from CSV")
    print(f"  Field: '{test_field}'")
    print(f"  Question: '{test_question}'")
    
    try:
        response = requests.post(
            API_URL,
            json={
                "field": test_field,
                "question": test_question
            }
        )
        
        if response.status_code == 200:
            result = response.json()
            print(f"\n✓ Response received:")
            print(f"  Answer: {result.get('answer', 'N/A')[:200]}")
            if 'confidence' in result:
                print(f"  Confidence: {result['confidence']}")
            if 'debug' in result:
                print(f"  Debug info: {result['debug']}")
        else:
            print(f"❌ Error: Status code {response.status_code}")
            print(f"  Response: {response.text}")
            
    except requests.exceptions.ConnectionError:
        print("❌ Error: Could not connect to API")
        print("  Make sure the server is running with: uvicorn app:app --reload")

# Test with the social media question
print(f"\n{'='*60}")
print("Test 2: Social media engagement question")
print(f"{'='*60}")

# Try to find what field should be used
social_media_rows = data[data['question'].str.contains('social media', case=False, na=False)]
if len(social_media_rows) > 0:
    correct_field = social_media_rows.iloc[0]['field']
    print(f"\nFound 'social media' question in CSV!")
    print(f"  Correct field should be: '{correct_field}'")
else:
    print(f"\n⚠ No 'social media' question found in CSV")
    print(f"  Available fields: {data['field'].unique().tolist()}")
    print(f"  You may need to use one of these fields for testing")
    correct_field = data['field'].unique()[0] if len(data['field'].unique()) > 0 else "marketing"

try:
    response = requests.post(
        API_URL,
        json={
            "field": correct_field,
            "question": "How can I increase social media engagement?"
        }
    )
    
    if response.status_code == 200:
        result = response.json()
        print(f"\n✓ Response received:")
        print(f"  Answer: {result.get('answer', 'N/A')[:200]}")
        if 'confidence' in result:
            print(f"  Confidence: {result['confidence']}")
        if 'debug' in result:
            print(f"  Debug info: {result['debug']}")
    else:
        print(f"❌ Error: Status code {response.status_code}")
        
except requests.exceptions.ConnectionError:
    print("❌ Error: Could not connect to API")
    print("  Make sure the server is running!")

print(f"\n{'='*60}")
print("TESTING COMPLETE")
print(f"{'='*60}")