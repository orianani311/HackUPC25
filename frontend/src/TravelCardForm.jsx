import React, { useState } from 'react';
import './TravelCardForm.css';

const mockImages = [
  "https://images.pexels.com/photos/346529/pexels-photo-346529.jpeg",
  "https://images.pexels.com/photos/672630/pexels-photo-672630.jpeg",
  "https://images.pexels.com/photos/210186/pexels-photo-210186.jpeg",
  "https://images.pexels.com/photos/1142950/pexels-photo-1142950.jpeg",
  "https://images.pexels.com/photos/699558/pexels-photo-699558.jpeg",
];

const hashtags = ["#adventure", "#culture", "#relax", "#nature", "#food", "#nightlife"];
const months = ["June", "July", "August"];
const climates = ["Warm", "Mild", "Cold"];

export default function TravelCardForm() {
  const [step, setStep] = useState(1);

  const [selectedImages, setSelectedImages] = useState([]);
  const [selectedHashtags, setSelectedHashtags] = useState([]);
  const [budget, setBudget] = useState("Medium");
  const [month, setMonth] = useState("June");
  const [climate, setClimate] = useState("Warm");

  const [result, setResult] = useState(null);

  const toggleImage = (url) => {
    setSelectedImages((prev) =>
      prev.includes(url)
        ? prev.filter((img) => img !== url)
        : prev.length < 3
        ? [...prev, url]
        : prev
    );
  };

  const toggleHashtag = (tag) => {
    setSelectedHashtags((prev) =>
      prev.includes(tag)
        ? prev.filter((t) => t !== tag)
        : prev.length < 3
        ? [...prev, tag]
        : prev
    );
  };

  const submitCard = async () => {
    const body = {
      month,
      climate,
      budget,
      eco_friendly: true, // optional dynamic logic later
    };

    const res = await fetch("http://localhost:8000/api/suggest", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const data = await res.json();
    setResult(data);
    setStep(6);
  };

  return (
    <div className="form-container">
      {step === 1 && (
        <>
          <div className="prompt-card">Choose 3 images you vibe with</div>
          <div className="image-grid">
            {mockImages.map((url, i) => (
              <div
                key={i}
                className={`image-option ${selectedImages.includes(url) ? 'selected' : ''}`}
                style={{ backgroundImage: `url(${url})` }}
                onClick={() => toggleImage(url)}
              />
            ))}
          </div>
          <button
            className="submit-button"
            disabled={selectedImages.length < 3}
            onClick={() => setStep(2)}
          >
            Next
          </button>
        </>
      )}

      {step === 2 && (
        <>
          <div className="prompt-card">Pick 3 hashtags</div>
          <div className="hashtag-grid">
            {hashtags.map((tag) => (
              <button
                key={tag}
                className={`hashtag-button ${selectedHashtags.includes(tag) ? 'selected' : ''}`}
                onClick={() => toggleHashtag(tag)}
              >
                {tag}
              </button>
            ))}
          </div>
          <button
            className="submit-button"
            disabled={selectedHashtags.length < 3}
            onClick={() => setStep(3)}
          >
            Next
          </button>
        </>
      )}

      {step === 3 && (
        <>
          <div className="prompt-card">What's your budget?</div>
          <div className="radio-group">
            {["Low", "Medium", "High"].map((b) => (
              <label key={b}>
                <input
                  type="radio"
                  name="budget"
                  value={b}
                  checked={budget === b}
                  onChange={() => setBudget(b)}
                />
                {b}
              </label>
            ))}
          </div>
          <button className="submit-button" onClick={() => setStep(4)}>Next</button>
        </>
      )}

      {step === 4 && (
        <>
          <div className="prompt-card">Pick a month and climate</div>
          <div className="radio-group">
            {months.map((m) => (
              <label key={m}>
                <input
                  type="radio"
                  name="month"
                  value={m}
                  checked={month === m}
                  onChange={() => setMonth(m)}
                />
                {m}
              </label>
            ))}
          </div>
          <div className="radio-group">
            {climates.map((c) => (
              <label key={c}>
                <input
                  type="radio"
                  name="climate"
                  value={c}
                  checked={climate === c}
                  onChange={() => setClimate(c)}
                />
                {c}
              </label>
            ))}
          </div>
          <button className="submit-button" onClick={() => setStep(5)}>Next</button>
        </>
      )}

      {step === 5 && (
        <>
          <div className="prompt-card">Ready to search?</div>
          <button className="submit-button" onClick={submitCard}>
            Submit My Travel Card
          </button>
        </>
      )}

      {step === 6 && result && (
        <div className="white-card-answer">
          <h2>🎉 Suggested Trip</h2>
          <p><strong>Destination:</strong> {result.destination}</p>
          <p><strong>Departure Date:</strong> {result.departure_date}</p>
          <p><strong>Price:</strong> €{result.price_eur}</p>
          <p><strong>Climate:</strong> {result.climate}</p>
          <p><strong>Budget:</strong> {result.budget}</p>
          <p><strong>Eco-Friendly:</strong> {result.eco_friendly ? "Yes" : "No"}</p>
        </div>
      )}
    </div>
  );
}
