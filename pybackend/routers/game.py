from fastapi import APIRouter
from pybackend.schemas.travel_card import TravelCard
from skyscanner import suggest_destination

router = APIRouter()

@router.post("/api/suggest")
def get_destination(card: TravelCard):
    return suggest_destination(card)
