import React, { useEffect, useState } from 'react';
import './CardStyles.css';

export default function ImageChoiceGrid({ onSelect, max = 3 }) {
  const [images, setImages] = useState([]);
  const [selected, setSelected] = useState([]);

  useEffect(() => {
    fetch('https://api.pexels.com/v1/search?query=travel&per_page=9', {
      headers: {
        Authorization: 'JldACPUW2cloqXQL3iQHc16EG6bA2SUCwfCcmKzUedzDnADPpSEzW2QF',
      },
    })
      .then((res) => res.json())
      .then((data) => {
        const urls = data.photos.map((p) => p.src.medium);
        setImages(urls);
      });
  }, []);

  const toggleSelect = (url) => {
    const updated = selected.includes(url)
      ? selected.filter((img) => img !== url)
      : selected.length < max
      ? [...selected, url]
      : selected;

    setSelected(updated);
    onSelect(updated);
  };

  return (
    <div className="card-grid">
      {images.map((url, i) => (
        <div
          key={i}
          className={`white-card image-option ${selected.includes(url) ? 'selected' : ''}`}
          style={{ backgroundImage: `url(${url})` }}
          onClick={() => toggleSelect(url)}
        ></div>
      ))}
    </div>
  );
}
