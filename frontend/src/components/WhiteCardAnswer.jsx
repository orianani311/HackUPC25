import React from 'react';
import './CardStyles.css';

export default function WhiteCardAnswer({ selectedImages }) {
  return (
    <div className="white-card answer-card">
      {selectedImages.length === 0 ? (
        <p>Selected images will appear here</p>
      ) : (
        selectedImages.map((url, i) => (
          <img
            key={i}
            src={url}
            alt="selected"
            style={{ width: '60px', height: '60px', margin: '4px', borderRadius: '4px' }}
          />
        ))
      )}
    </div>
  );
}
