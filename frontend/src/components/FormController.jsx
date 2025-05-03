import React, { useState, useEffect } from 'react';
import BlackCardPrompt from './BlackCardPrompt';
import ImageChoiceGrid from './ImageChoiceGrid';
import WhiteCardAnswer from './WhiteCardAnswer';
import StepProgress from './StepProgress';
import './CardStyles.css';
import HashtagSelector from './HashtagSelector';


export default function FormController() {
  const [step, setStep] = useState(0);
  const [selected, setSelected] = useState([]);
  const [selectedImages, setSelectedImages] = useState([]);
  const [hashtags, setHashtags] = useState([]);
  const [budget, setBudget] = useState(null);
  const [months, setMonths] = useState([]);
  const [blackCardMoved, setBlackCardMoved] = useState(false);
  const [blackCardHidden, setBlackCardHidden] = useState(false);
  const [showImages, setShowImages] = useState(false);


  // STEP 0 Animation
  useEffect(() => {
    if (step !== 0) return;
    const moveTimeout = setTimeout(() => setBlackCardMoved(true), 2000);
    const hideTimeout = setTimeout(() => {
      setBlackCardHidden(true);
      setShowImages(true);
    }, 3000);
    return () => {
      clearTimeout(moveTimeout);
      clearTimeout(hideTimeout);
    };
  }, [step]);

  const buttonStyle = {
    background: 'white',
    color: 'black',
    padding: '0.5rem 1.2rem',
    borderRadius: '6px',
    fontWeight: 'bold',
    border: 'none',
    cursor: 'pointer',
  };

  return (
    <div className="form-wrapper">
      <StepProgress currentStep={step} />

      {/* STEP 0: Choose 3 images */}
      {step === 0 && (
        <>
          {!blackCardHidden && !blackCardMoved && (
            <div className="black-card-animated">
              <BlackCardPrompt text="Choose 3 images that reflect your vibe" />
            </div>
          )}
          {!blackCardHidden && blackCardMoved && (
            <div className="black-card-animated moved" />
          )}
          {showImages && (
            <>
              <ImageChoiceGrid onSelect={setSelected} max={3} />
              <WhiteCardAnswer selectedImages={selected} />
              <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', padding: '0 2rem', marginTop: '2rem' }}>
                <button style={buttonStyle} onClick={() => window.history.back()}>
                  Back
                </button>
                {selected.length === 3 && (
                  <button style={buttonStyle} onClick={() => setStep(1)}>
                    Next
                  </button>
                )}
              </div>
            </>
          )}
        </>
      )}

{step === 1 && (
  <div className="hashtag-selector">
    <h2 style={{ color: 'white', marginBottom: '1rem' }}>Pick 3 Hashtags</h2>
    <div className="hashtag-grid">
      {['#foodie', '#adventure', '#beach', '#culture', '#nightlife', '#nature'].map(tag => (
        <button
          key={tag}
          className={`hashtag-card ${hashtags.includes(tag) ? 'selected' : ''}`}
          onClick={() => {
            setHashtags(prev =>
              prev.includes(tag)
                ? prev.filter(t => t !== tag)
                : prev.length < 3
                ? [...prev, tag]
                : prev
            );
          }}
        >
          {tag}
        </button>
      ))}
    </div>
    <button
      style={{
        ...buttonStyle,
        marginTop: '2rem',
        opacity: hashtags.length === 3 ? 1 : 0.4,
        pointerEvents: hashtags.length === 3 ? 'auto' : 'none'
      }}
      onClick={() => setStep(2)}
    >
      Next
    </button>
  </div>
)}

      {/* STEP 2: Budget selection (Placeholder) */}
      {step === 2 && (
      <HashtagSelector
        selected={hashtags}
        onSelect={setHashtags}
        onNext={() => setStep(prev => prev + 1)}
      />
    )}

      {/* STEP 3: Climate/Month selection (Placeholder) */}
      {step === 3 && (
        <div className="placeholder">
          <h2 style={{ color: 'white' }}>Climate / Month Selector Placeholder</h2>
          <button style={buttonStyle} onClick={() => setStep(4)}>Next</button>
        </div>
      )}

      {/* STEP 4: Summary */}
      {step === 4 && (
        <div style={{ color: 'white', textAlign: 'center', marginTop: '4rem' }}>
          <h2>Summary Page</h2>
          <p>Images: {selected.length}</p>
          <p>Hashtags: {hashtags.join(', ') || '–'}</p>
          <p>Budget: €{budget || '–'}</p>
          <p>Months: {months.join(', ') || '–'}</p>
        </div>
      )}
    </div>
  );
}
