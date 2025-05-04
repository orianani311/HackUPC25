import React from 'react';
import './CardStyles.css';

const hashtags = ['#adventure', '#culture', '#beach', '#nightlife', '#nature', '#foodie'];

export default function HashtagSelection({ selected = [], onSelect, onNext }) {
  const toggle = (tag) => {
    if (selected.includes(tag)) {
      onSelect(selected.filter(h => h !== tag));
    } else if (selected.length < 3) {
      onSelect([...selected, tag]);
    }
  };

  return (
    <div className="hashtag-wrapper">
      <div className="hashtag-grid">
        {hashtags.map((tag, idx) => (
          <button
            key={idx}
            className={`hashtag-circle ${selected.includes(tag) ? 'selected' : ''}`}
            onClick={() => toggle(tag)}
          >
            {tag}
          </button>
        ))}
      </div>

      <button
        className={`next-button ${selected.length === 3 ? 'active' : 'disabled'}`}
        onClick={selected.length === 3 ? onNext : null}
        disabled={selected.length !== 3}
      >
        Next
      </button>
    </div>
  );
}
