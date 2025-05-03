from fastapi import APIRouter
from typing import List, Dict, Any
from pybackend.schemas.travel_card import TravelCard
from pybackend.utils.skyscanner import suggest_destination
from pybackend.utils.skyscanner import poll_results



router = APIRouter(
    prefix="/game",
    tags=["game"]
)

# Game state (temporary in-memory for hackathon)
game_state = {
    "cards": [],      # All submitted TravelCards
    "votes": {},      # card_id -> vote count
    "player_map": {}  # card_id -> player_id
}

@router.post("/start")
def start_game(cards: List[TravelCard]):
    game_state["cards"] = cards
    game_state["votes"] = {card.id: 0 for card in cards}
    game_state["player_map"] = {card.id: card.player_id for card in cards}
    return {"status": "Game started", "card_count": len(cards)}

@router.get("/round")
def get_anonymous_cards(current_player_id: str):
    # Return all cards except the ones belonging to the current player
    return [card for card in game_state["cards"] if card.player_id != current_player_id]

@router.post("/vote")
def vote(card_id: int):
    if card_id in game_state["votes"]:
        game_state["votes"][card_id] += 1
        return {"status": "Vote counted"}
    return {"error": "Invalid card ID"}

@router.get("/results")
def reveal_results():
    if not game_state["votes"]:
        return {"error": "No votes recorded"}
    
    # Find card with the most votes
    most_voted_id = max(game_state["votes"], key=game_state["votes"].get)
    votes = game_state["votes"][most_voted_id]
    owner = game_state["player_map"][most_voted_id]

    return {
        "most_voted_card_id": most_voted_id,
        "votes": votes,
        "owner": owner
    }


@router.post("/suggest")
def suggest_trip(card: TravelCard):
    return suggest_destination(card)
