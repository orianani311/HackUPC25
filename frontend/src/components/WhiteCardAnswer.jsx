import React from 'react';
import './CardStyles.css';

export default function WhiteCardAnswer({ selectedImages }) {
  if (selectedImages.length < 1) return null;

  return (
    <div className="white-card-wrapper">
      <div className="white-card answer-final">
        {selectedImages.map((src, index) => (
          <React.Fragment key={index}>
            <div
              className="answer-mini"
              style={{ backgroundImage: `url(${src})` }}
            />
            {index < selectedImages.length - 1 && (
              <span style={{ color: 'white', fontSize: '1.5rem', margin: '0 6px' }}>+</span>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
