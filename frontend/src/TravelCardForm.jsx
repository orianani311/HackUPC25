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

export default function TravelCardForm() {
  const [step, setStep] = useState(1);
  const [selectedImages, setSelectedImages] = useState([]);
  const [selectedHashtags, setSelectedHashtags] = useState([]);
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
    const res = await fetch("http://localhost:8000/api/suggest", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        images: selectedImages,
        hashtags: selectedHashtags,
      }),
    });

    const data = await res.json();
    setResult(data);
    setStep(4);
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
          <div className="prompt-card">Finding your destination...</div>
          <button className="submit-button" onClick={submitCard}>
            Reveal Match
          </button>
        </>
      )}

      {step === 4 && result && (
        <div className="white-card-answer">
          <h2>🎉 Suggested Trip</h2>
          <p><strong>Destination:</strong> {result.destination}</p>
          <p><strong>Departure Date:</strong> {result.date}</p>
          <p><strong>Price:</strong> €{result.price}</p>
          <p><strong>Selected Hashtags:</strong> {result.hashtags.join(", ")}</p>
        </div>
      )}
    </div>
  );
}
