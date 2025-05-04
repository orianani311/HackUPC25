# amadeus_client.py
import os
import requests
from dotenv import load_dotenv

load_dotenv()

API_KEY = os.getenv("AMADEUS_API_KEY")
API_SECRET = os.getenv("AMADEUS_API_SECRET")
BASE_URL = "https://test.api.amadeus.com"

def get_access_token():
    url = f"{BASE_URL}/v1/security/oauth2/token"
    headers = {"Content-Type": "application/x-www-form-urlencoded"}
    data = {
        "grant_type": "client_credentials",
        "client_id": API_KEY,
        "client_secret": API_SECRET
    }

    response = requests.post(url, headers=headers, data=data)
    response.raise_for_status()
    return response.json()["access_token"]

def get_flight_offer(origin="FCO", destination="BCN", date="2025-06-10"):
    try:
        token = get_access_token()
        url = f"{BASE_URL}/v2/shopping/flight-offers"
        headers = {
            "Authorization": f"Bearer {token}",
            "Content-Type": "application/json"
        }

        payload = {
            "currencyCode": "EUR",
            "originDestinations": [
                {
                    "id": "1",
                    "originLocationCode": origin,
                    "destinationLocationCode": destination,
                    "departureDateTimeRange": {
                        "date": date
                    }
                }
            ],
            "travelers": [
                {
                    "id": "1",
                    "travelerType": "ADULT"
                }
            ],
            "sources": ["GDS"],
            "searchCriteria": {
                "maxFlightOffers": 1
            }
        }

        response = requests.post(url, headers=headers, json=payload)
        print("🎯 Response:", response.status_code, response.text)
        response.raise_for_status()
        data = response.json()

        offer = data["data"][0]
        return {
            "price": offer["price"]["total"],
            "destination": destination,
            "origin": origin,
            "date": date
        }

    except Exception as e:
        print("❌ Amadeus Flight Offer Error:", e)
        raise e
