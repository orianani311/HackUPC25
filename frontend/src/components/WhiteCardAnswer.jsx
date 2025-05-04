import React from 'react';
import './CardStyles.css';

export default function WhiteCardAnswer({ selectedImages, onNext }) {
  const ready = selectedImages.length === 3;

  return (
    <div className="white-card-wrapper">
      <div className="answer-composition">
        {selectedImages.map((src, index) => (
          <div
            key={index}
            className="answer-mini"
            style={{ backgroundImage: `url(${src})` }}
          />
        ))}
      </div>
      <button
        className={`next-button ${ready ? 'active' : 'disabled'}`}
        onClick={ready ? onNext : null}
        disabled={!ready}
      >
        Next
      </button>
    </div>
  );
}
