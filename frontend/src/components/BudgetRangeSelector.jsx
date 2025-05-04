// BudgetRangeSelector.jsx
import React, { useState } from 'react';
import './CardStyles.css';

export default function BudgetRangeSelector({ onNext }) {
  const [budget, setBudget] = useState(1000);
  const [confirmed, setConfirmed] = useState(false);

  const label = budget < 900 ? 'Low' : budget < 1500 ? 'Medium' : 'High';

  const handleChange = (e) => {
    setBudget(parseInt(e.target.value));
    setConfirmed(true);
  };

  const handleNext = () => {
    if (confirmed && onNext) {
      onNext(budget);
    }
  };

  return (
    <div className="budget-selector">
      <h2>Select Your Budget</h2>
      <div className="slider-label">
        €{budget} - <span className="range-label">{label}</span>
      </div>
      <input
        type="range"
        min="500"
        max="2000"
        step="50"
        value={budget}
        onChange={handleChange}
      />
      <button
        className={`next-button ${confirmed ? 'active' : 'disabled'}`}
        onClick={handleNext}
        disabled={!confirmed}
      >
        Next
      </button>
    </div>
  );
}
