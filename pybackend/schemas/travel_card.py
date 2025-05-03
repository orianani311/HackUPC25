from typing import List, Optional
from pydantic import BaseModel

class TravelCardCreate(BaseModel):
    images: List[str]
    hashtags: List[str]
    budget: str
    climate: Optional[str] = None
    month: Optional[str] = None
    eco_friendly: bool

class TravelCard(TravelCardCreate):
    id: int
    player_id: str
