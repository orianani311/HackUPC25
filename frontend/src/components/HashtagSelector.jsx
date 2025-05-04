// HashtagSelector.jsx
import React from 'react';
import './CardStyles.css';
import './HashtagSelector.css';

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
      <div className="hashtag-grid">
        {HASHTAGS.map((tag) => (
          <button
            key={tag}
            className={`hashtag-button ${selected.includes(tag) ? 'selected' : ''}`}
            onClick={() => toggle(tag)}
          >
            {tag}
          </button>
        ))}
      </div>
      <div className="navigation-buttons">
  <button className="back-button" onClick={() => window.history.back()}>
    Back
  </button>
  <button
    className={`next-button ${selected.length === 3 ? 'active' : 'disabled'}`}
    onClick={onNext}
    disabled={selected.length !== 3}
  >
    Next
  </button>
</div>

    </div>
  );
}
