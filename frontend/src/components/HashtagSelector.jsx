// HashtagSelector.jsx
import React from 'react';
import './CardStyles.css';

const HASHTAGS = ['#foodie', '#adventure', '#beach', '#culture', '#nightlife', '#nature'];

export default function HashtagSelector({ selected, onSelect, onNext }) {
  const toggle = (tag) => {
    if (selected.includes(tag)) {
      onSelect(selected.filter(t => t !== tag));
    } else if (selected.length < 3) {
      onSelect([...selected, tag]);
    }
  };

  return (
    <div className="hashtag-selector">
      <h2 className="hashtag-title">Pick 3 Hashtags</h2>
      <div className="hashtag-list">
        {HASHTAGS.map(tag => (
          <button
            key={tag}
            className={`hashtag-pill ${selected.includes(tag) ? 'selected' : ''}`}
            onClick={() => toggle(tag)}
          >
            {tag}
          </button>
        ))}
      </div>
      <button
        className={`next-button ${selected.length === 3 ? 'active' : 'disabled'}`}
        onClick={onNext}
        disabled={selected.length !== 3}
      >
        Next
      </button>
    </div>
  );
}
