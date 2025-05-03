import React, { useState } from 'react';
import './TravelCardForm.css';

const mockImages = [
  "https://images.pexels.com/photos/346529/pexels-photo-346529.jpeg",
  "https://images.pexels.com/photos/672630/pexels-photo-672630.jpeg",
  "https://images.pexels.com/photos/210186/pexels-photo-210186.jpeg",
  "https://images.pexels.com/photos/1142950/pexels-photo-1142950.jpeg",
  "https://images.pexels.com/photos/699558/pexels-photo-699558.jpeg",
];

export default function TravelCardForm() {
  const [selectedImages, setSelectedImages] = useState([]);

  const toggleImage = (url) => {
    setSelectedImages((prev) =>
      prev.includes(url)
        ? prev.filter((img) => img !== url)
        : prev.length < 5
        ? [...prev, url]
        : prev
    );
  };

  return (
    <div className="form-wrapper">
      <div className="white-card prompt-card">Choose 3 images you vibe with</div>

      <div className="card-grid">
        {mockImages.map((url, i) => (
          <div
            key={i}
            className={`white-card image-card ${selectedImages.includes(url) ? 'selected' : ''}`}
            onClick={() => toggleImage(url)}
            style={{ backgroundImage: `url(${url})` }}
          />
        ))}
      </div>

      <button
        className="submit-button"
        disabled={selectedImages.length < 3}
        onClick={() => alert('Submitted images: ' + selectedImages.join(', '))}
      >
        Continue
      </button>
    </div>
  );
}
