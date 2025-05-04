import React, { useState, useEffect } from 'react';
import BlackCardPrompt from './BlackCardPrompt';
import ImageChoiceGrid from './ImageChoiceGrid';
import WhiteCardAnswer from './WhiteCardAnswer';
import StepProgress from './StepProgress';
import HashtagSelection from './HashtagSelection';
import BudgetRangeSelector from './BudgetRangeSelector';
import MonthClimateSelector from './MonthClimateSelector';
import SummaryCard from './SummaryCard';
import './CardStyles.css';

export default function FormController() {
  const [stage, setStage] = useState('intro'); // stages: intro → images → hashtags → budget → climate → summary
  const [selectedImages, setSelectedImages] = useState([]);
  const [selectedHashtags, setSelectedHashtags] = useState([]);
  const [budget, setBudget] = useState(null);
  const [months, setMonths] = useState([]);

  const [blackCardMoved, setBlackCardMoved] = useState(false);
  const [blackCardHidden, setBlackCardHidden] = useState(false);
  const [showImages, setShowImages] = useState(false);

  // Intro card animation
  useEffect(() => {
    if (stage !== 'intro') return;
    const moveTimeout = setTimeout(() => setBlackCardMoved(true), 2000);
    const hideTimeout = setTimeout(() => {
      setBlackCardHidden(true);
      setShowImages(true);
    }, 3000);
    return () => {
      clearTimeout(moveTimeout);
      clearTimeout(hideTimeout);
    };
  }, [stage]);

  const buttonStyle = {
    background: 'white',
    color: 'black',
    padding: '0.5rem 1.2rem',
    borderRadius: '6px',
    fontWeight: 'bold',
    border: 'none',
    cursor: 'pointer',
  };

  const stageOrder = ['intro', 'images', 'hashtags', 'budget', 'climate', 'summary'];
  const currentStep = stageOrder.indexOf(stage);

  return (
    <div className="form-wrapper">
      <StepProgress currentStep={currentStep} />

      {/* Intro screen with animation */}
      {stage === 'intro' && (
        <>
          {!blackCardHidden && !blackCardMoved && (
            <div className="black-card-animated">
              <BlackCardPrompt text="Choose 3 images that reflect your vibe" />
            </div>
          )}
          {!blackCardHidden && blackCardMoved && (
            <div className="black-card-animated moved" />
          )}
          {showImages && setStage('images')}
        </>
      )}

      {/* Image selection stage */}
      {stage === 'images' && (
        <>
          <ImageChoiceGrid onSelect={setSelectedImages} max={3} />
          <WhiteCardAnswer
            selectedImages={selectedImages}
            onNext={() => setStage('hashtags')}
          />
        </>
      )}

      {/* Hashtag selection stage */}
      {stage === 'hashtags' && (
        <HashtagSelection
          onSelect={setSelectedHashtags}
          selected={selectedHashtags}
          onNext={() => setStage('budget')}
        />
      )}

      {/* Budget selection stage */}
      {stage === 'budget' && (
        <BudgetRangeSelector
          onNext={(value) => {
            setBudget(value);
            setStage('climate');
          }}
        />
      )}

      {/* Month/climate selection stage */}
      {stage === 'climate' && (
        <MonthClimateSelector
          onNext={(value) => {
            setMonths(value);
            setStage('summary');
          }}
        />
      )}

      {/* Final summary screen */}
      {stage === 'summary' && <SummaryCard />}
    </div>
  );
}
