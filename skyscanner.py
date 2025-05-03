from random import choice

def suggest_destination(card):
    mock_destinations = [
        {"name": "Lisbon", "iata": "LIS", "price_eur": 95},
        {"name": "Athens", "iata": "ATH", "price_eur": 120},
        {"name": "Nice", "iata": "NCE", "price_eur": 110},
        {"name": "Prague", "iata": "PRG", "price_eur": 85},
        {"name": "Barcelona", "iata": "BCN", "price_eur": 130}
    ]

    destination = choice(mock_destinations)

    return {
        "destination": destination["name"],
        "iata": destination["iata"],
        "price_eur": destination["price_eur"],
        "eco_friendly": card.eco_friendly,
        "climate": card.climate,
        "budget": card.budget,
        "month": card.month
    }

