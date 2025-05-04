import React from 'react';
import './CardStyles.css';

export default function WhiteCardAnswer({ selectedImages, onNext, onBack }) {
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

      <div
        className="navigation-buttons"
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          width: '100%',
          padding: '0 2rem',
          marginTop: '2rem',
        }}
      >
        {onBack && (
          <button
            className="next-button"
            onClick={onBack}
            style={{ padding: '0.6rem 1.5rem' }}
          >
            Back
          </button>
        )}
        <button
          className={`next-button ${ready ? 'active' : 'disabled'}`}
          onClick={ready ? onNext : null}
          disabled={!ready}
          style={{ padding: '0.6rem 1.5rem' }}
        >
          Next
        </button>
      </div>
    </div>
  );
}
