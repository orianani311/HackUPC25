from fastapi import FastAPI
from pybackend.routers import cards, game



app = FastAPI(
    title="The Perfect Reunion",
    description="Backend for the anonymous travel planning game",
    version="1.0.0"
)

# Register routers
app.include_router(cards.router)
app.include_router(game.router)

# Basic health check endpoint
@app.get("/")
def root():
    return {"message": "The backend is running!"}
