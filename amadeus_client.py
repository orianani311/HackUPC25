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

def get_destination_inspiration(origin="FCO", max_price=200):
    token = get_access_token()
    url = f"{BASE_URL}/v1/shopping/flight-destinations"
    headers = {"Authorization": f"Bearer {token}"}
    params = {
        "origin": origin,
        "maxPrice": max_price,
        "currencyCode": "EUR"
    }

    response = requests.get(url, headers=headers, params=params)
    response.raise_for_status()
    data = response.json()

    if not data.get("data"):
        return {"error": "No destinations found"}

    # Pick the first result for simplicity
    first = data["data"][0]
    return {
        "destination": first["destination"],
        "price": first["price"]["total"],
        "departureDate": first["departureDate"]
    }
