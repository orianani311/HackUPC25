import os
from dotenv import load_dotenv
import requests
from datetime import datetime
from random import choice

load_dotenv()

API_HOST = "skyscanner44.p.rapidapi.com"
API_KEY = os.getenv("SKYSCANNER_API_KEY")

HEADERS = {
    "X-RapidAPI-Key": API_KEY,
    "X-RapidAPI-Host": API_HOST
}
