from dotenv import load_dotenv
import os

load_dotenv()

key = os.getenv("SKYSCANNER_API_KEY")
if key:
    print(f"✅ API key loaded: {key[:5]}...***")
else:
    print("❌ API key not found!")
