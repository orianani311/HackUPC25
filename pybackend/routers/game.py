# game.py

from fastapi import APIRouter
from pydantic import BaseModel
from skyscanner import suggest_destination

router = APIRouter()

class TravelCard(BaseModel):
    month: str
    climate: str
    budget: str
    eco_friendly: bool

@router.post("/api/suggest")
def get_destination(card: TravelCard):
    return suggest_destination(card)
