// FormController.jsx
import React, { useState, useEffect } from 'react';
import BlackCardPrompt from './BlackCardPrompt';
import ImageChoiceGrid from './ImageChoiceGrid';
import WhiteCardAnswer from './WhiteCardAnswer';
import HashtagSelector from './HashtagSelector';
import BudgetRangeSelector from './BudgetRangeSelector';
import MonthClimateSelector from './MonthClimateSelector';
import SummaryCard from './SummaryCard';
import StepProgress from './StepProgress';
import './CardStyles.css';

export default function FormController() {
  const [step, setStep] = useState(0);
  const [selected, setSelected] = useState([]);
  const [hashtags, setHashtags] = useState([]);
  const [budget, setBudget] = useState(null);
  const [months, setMonths] = useState([]);
  const [blackCardMoved, setBlackCardMoved] = useState(false);
  const [blackCardHidden, setBlackCardHidden] = useState(false);
  const [showImages, setShowImages] = useState(false);

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

      {/* STEP 0: Image Selection */}
      {step === 0 && (
        <>
          {!blackCardHidden && !blackCardMoved && (
            <div className="black-card-animated">
              <BlackCardPrompt text="Choose 3 images that reflect your vibe" />
            </div>
          )}
          {!blackCardHidden && blackCardMoved && <div className="black-card-animated moved" />}
          {showImages && (
            <>
              <ImageChoiceGrid onSelect={setSelected} max={3} />
              <WhiteCardAnswer selectedImages={selected} />
              <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', padding: '0 2rem', marginTop: '2rem' }}>
                <button style={buttonStyle} onClick={() => window.history.back()}>Back</button>
                {selected.length === 3 && (
                  <button style={buttonStyle} onClick={() => setStep(1)}>Next</button>
                )}
              </div>
            </>
          )}
        </>
      )}

      {/* STEP 1: Hashtag Selection */}
      {step === 1 && (
        <HashtagSelector
          selected={hashtags}
          onSelect={setHashtags}
          onNext={() => setStep(2)}
        />
      )}

      {/* STEP 2: Budget Selection */}
      {step === 2 && (
        <BudgetRangeSelector
          onSelect={setBudget}
          onNext={() => setStep(3)}
        />
      )}

      {/* STEP 3: Month Selection */}
      {step === 3 && (
        <MonthClimateSelector
          onSelect={setMonths}
          onNext={() => setStep(4)}
        />
      )}

      {/* STEP 4: Summary */}
      {step === 4 && (
        <SummaryCard
          images={selected}
          hashtags={hashtags}
          budget={budget}
          months={months}
        />
      )}
    </div>
  );
}
