import React, { useState } from 'react';
import ImageChoiceGrid from './ImageChoiceGrid';
import WhiteCardAnswer from './WhiteCardAnswer';
import HashtagSelector from './HashtagSelector';
import BudgetRangeSelector from './BudgetRangeSelector';
import MonthClimateSelector from './MonthClimateSelector';
import SummaryCard from './SummaryCard';
import StepProgress from './StepProgress';
import './TravelCardForm.css';

export default function TravelCardForm() {
  const [step, setStep] = useState(0);
  const [selectedImages, setSelectedImages] = useState([]);
  const [hashtags, setHashtags] = useState([]);
  const [budget, setBudget] = useState(1000);
  const [months, setMonths] = useState([]);

  const handleImageNext = () => {
    if (selectedImages.length === 3) {
      setStep(1);
    }
  };

  const handleHashtagNext = () => {
    if (hashtags.length === 3) {
      setStep(2);
    }
  };

  const handleBudgetNext = () => {
    if (budget) {
      setStep(3);
    }
  };

  const handleMonthNext = () => {
    if (months.length > 0) {
      setStep(4);
    }
  };

  return (
    <div className="form-wrapper">
      <StepProgress currentStep={step} />

      {step === 0 && (
        <>
          <ImageChoiceGrid onSelect={setSelectedImages} max={3} selected={selectedImages} />
          <WhiteCardAnswer selectedImages={selectedImages} />
          <div className="navigation-buttons">
            <button className="back-button" disabled>Back</button>
            <button
              className={`next-button ${selectedImages.length === 3 ? 'active' : 'disabled'}`}
              onClick={handleImageNext}
              disabled={selectedImages.length !== 3}
            >
              Next
            </button>
          </div>
        </>
      )}

      {step === 1 && (
        <>
          <HashtagSelector
            selected={hashtags}
            onSelect={setHashtags}
            onNext={handleHashtagNext}
          />
          <div className="navigation-buttons">
            <button className="back-button" onClick={() => setStep(0)}>Back</button>
          </div>
        </>
      )}

      {step === 2 && (
        <>
          <BudgetRangeSelector onSelect={setBudget} onNext={handleBudgetNext} />
          <div className="navigation-buttons">
            <button className="back-button" onClick={() => setStep(1)}>Back</button>
          </div>
        </>
      )}

      {step === 3 && (
        <>
          <MonthClimateSelector selected={months} onSelect={setMonths} onNext={handleMonthNext} />
          <div className="navigation-buttons">
            <button className="back-button" onClick={() => setStep(2)}>Back</button>
          </div>
        </>
      )}

      {step === 4 && (
        <SummaryCard
          selectedImages={selectedImages}
          hashtags={hashtags}
          budget={budget}
          months={months}
        />
      )}
    </div>
  );
}
