from fastapi import APIRouter
from typing import List
from schemas.travel_card import TravelCard


router = APIRouter(
    prefix="/cards",
    tags=["cards"]
)

# TEMPORARY in-memory store (use a database later)
cards_db: List[TravelCard] = []

@router.post("/", response_model=TravelCard)
def create_card(card: TravelCardCreate):
    new_card = TravelCard(
        id=len(cards_db) + 1,
        player_id="anon123",  # Replace with session/user ID later
        **card.dict()
    )
    cards_db.append(new_card)
    return new_card

@router.get("/", response_model=List[TravelCard])
def list_cards():
    return cards_db
