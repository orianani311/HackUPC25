import os
import requests
from dotenv import load_dotenv
from random import choice

load_dotenv()

API_KEY = os.getenv("SKYSCANNER_API_KEY")

API_URL = "https://partners.api.skyscanner.net/apiservices/v3/flights/live/search/create"

# Map month name to travel date
MONTH_MAP = {
    "January": (2025, 1, 10),
    "February": (2025, 2, 10),
    "March": (2025, 3, 10),
    "April": (2025, 4, 10),
    "May": (2025, 5, 10),
    "June": (2025, 6, 10),
    "July": (2025, 7, 10),
    "August": (2025, 8, 10),
    "September": (2025, 9, 10),
    "October": (2025, 10, 10),
    "November": (2025, 11, 10),
    "December": (2025, 12, 10)
}

def suggest_destination(card):
    year, month, day = MONTH_MAP.get(card.month, (2025, 6, 10))

    headers = {
        "Content-Type": "application/json",
        "apikey": API_KEY
    }

    payload = {
        "query": {
            "market": "IT",
            "locale": "en-GB",
            "currency": "EUR",
            "queryLegs": [
                {
                    "originPlace": {"queryPlace": {"iata": "FCO"}},  # Rome
                    "destinationPlace": {"queryPlace": {"iata": "ANY"}},
                    "date": {"year": year, "month": month, "day": day}
                }
            ],
            "cabinClass": "CABIN_CLASS_ECONOMY",
            "adults": 1
        }
    }

    try:
        print("✈️ Sending request to Skyscanner API...")
        response = requests.post(API_URL, headers=headers, json=payload)
        print("📦 Raw Response:", response.text)

        response.raise_for_status()
        data = response.json()

        session_token = data.get("sessionToken")
        if not session_token:
            return {"error": "No sessionToken returned. Response may be incomplete.", "raw": data}

        return {
            "message": "Search created successfully.",
            "sessionToken": session_token,
            "departure": f"{year}-{month:02d}-{day:02d}",
            "eco_friendly": card.eco_friendly,
            "climate": card.climate,
            "budget": card.budget
        }

    except requests.exceptions.RequestException as e:
        return {"error": str(e)}

def poll_results(session_token):
    url = f"https://partners.api.skyscanner.net/apiservices/v3/flights/live/search/poll/{session_token}"

    headers = {
        "apikey": API_KEY
    }

    try:
        print("🔄 Polling for flight results...")
        response = requests.get(url, headers=headers)
        print("📦 Poll Response:", response.text)

        response.raise_for_status()
        data = response.json()

        # Extract basic info from itineraries
        itineraries = data.get("content", {}).get("results", {}).get("itineraries", {})
        if not itineraries:
            return {"message": "No flight results found yet."}

        first_key = next(iter(itineraries))
        itinerary = itineraries[first_key]

        # Example: parse pricing
        price_id = itinerary.get("pricingOptions", [])[0].get("price", {}).get("amount", "N/A")

        return {
            "summary": "Sample itinerary found.",
            "price_eur": price_id,
            "raw": itinerary  # Optional: show entire structure
        }

    except requests.exceptions.RequestException as e:
        return {"error": str(e)}
