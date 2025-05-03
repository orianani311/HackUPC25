from pydantic import BaseModel

class TravelCard(BaseModel):
    month: str
    climate: str
    budget: str
    eco_friendly: bool
