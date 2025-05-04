from fastapi import APIRouter
from pydantic import BaseModel
from amadeus_client import get_flight_offer

router = APIRouter()

class TravelCardInput(BaseModel):
    images: list[str]
    hashtags: list[str]

@router.post("/api/suggest")
def suggest_destination(card: TravelCardInput):
    # Basic mapping of hashtags to destinations
    if "#relax" in card.hashtags:
        dest = "PMI"  # Palma de Mallorca
    elif "#adventure" in card.hashtags:
        dest = "REK"  # Reykjavik
    elif "#culture" in card.hashtags:
        dest = "FCO"  # Rome
    else:
        dest = "BCN"  # default to Barcelona

    result = get_flight_offer(origin="FCO", destination=dest, date="2025-06-10")
    return {
        **result,
        "hashtags": card.hashtags,
        "images": card.images
    }
