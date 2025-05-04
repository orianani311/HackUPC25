import React, { useEffect, useState } from 'react';
import './CardStyles.css';

const PEXELS_API_KEY = 'JldACPUW2cloqXQL3iQHc16EG6bA2SUCwfCcmKzUedzDnADPpSEzW2QF';
const LLM_ENDPOINT = 'http://localhost:8000/generate-destination'; // Your new backend route

export default function SummaryCard({ selectedImages, selectedHashtags, budget, months }) {
  const [imageUrl, setImageUrl] = useState(null);
  const [destination, setDestination] = useState('');

  useEffect(() => {
    const fetchDestinationAndImage = async () => {
      try {
        // 1. Ask LLM for the best destination
        const res = await fetch(LLM_ENDPOINT, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            budget,
            hashtags: selectedHashtags,
            months,
          }),
        });

        const { destination } = await res.json();
        setDestination(destination);

        // 2. Use destination as Pexels query
        const pexelsRes = await fetch(
          `https://api.pexels.com/v1/search?query=${encodeURIComponent(destination)}&per_page=1`,
          {
            headers: { Authorization: PEXELS_API_KEY },
          }
        );

        const data = await pexelsRes.json();
        const photo = data.photos?.[0];
        if (photo) setImageUrl(photo.src.large);
      } catch (err) {
        console.error('Error fetching destination or image:', err);
      }
    };

    fetchDestinationAndImage();
  }, [selectedHashtags, budget, months]);

  return (
    <div className="summary-card-container">
      <div className="summary-card">
        <h3 className="summary-card-title">{destination || "Your Destination"}</h3>
        {imageUrl ? (
          <div
            className="summary-image"
            style={{ backgroundImage: `url(${imageUrl})` }}
          />
        ) : (
          <div className="loading">Loading image...</div>
        )}
        <p className="summary-card-footer">Based on your vibes ✈️</p>
      </div>
    </div>
  );
}