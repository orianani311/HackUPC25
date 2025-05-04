from fastapi import APIRouter
from pybackend.schemas.travel_card import TravelCard
from amadeus_client import get_destination_inspiration

router = APIRouter()

@router.post("/api/suggest")
def suggest_destination(card: TravelCard):
    # You can adjust logic to map budget → price range
    budget_map = {
        "Low": 100,
        "Medium": 200,
        "High": 400
    }

    max_price = budget_map.get(card.budget, 200)
    result = get_destination_inspiration(origin="FCO", max_price=max_price)

    return {
        "destination": result.get("destination"),
        "price_eur": result.get("price"),
        "departure_date": result.get("departureDate"),
        "month": card.month,
        "climate": card.climate,
        "eco_friendly": card.eco_friendly,
        "budget": card.budget
    }
