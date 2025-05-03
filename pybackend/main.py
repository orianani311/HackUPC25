# main.py

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from game import router as game_router  # or from routers.game if in a subfolder

app = FastAPI(
    title="The Perfect Reunion",
    description="Backend for the anonymous travel planning game",
    version="1.0.0"
)

# Enable CORS so React frontend can call the API
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # React dev server
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register routes
app.include_router(game_router)

# Optional health check
@app.get("/")
def root():
    return {"message": "The backend is running!"}
