import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './CardStyles.css';

const PEXELS_API_KEY = 'JldACPUW2cloqXQL3iQHc16EG6bA2SUCwfCcmKzUedzDnADPpSEzW2QF';
const PEXELS_API_URL = 'https://api.pexels.com/v1/search?query=spain&per_page=2';
const SKYSCANNER_API_KEY = 'sh967490139224896692439644109194';

export default function SummaryCard() {
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    fetch(PEXELS_API_URL, {
      headers: {
        Authorization: PEXELS_API_KEY,
      },
    })
      .then(res => res.json())
      .then(data => {
        console.log('PEXELS response:', data);  
        const photo = data.photos?.[0];
        if (photo) {
          setImageUrl(photo.src.large);
        }
      })
      .catch(console.error);
  }, []);

  return (
    <div className="summary-card-wrapper">
      <div className="summary-card">
        <h3 className="summary-card-title">Your Destination</h3>
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
