// BudgetRangeSelector.jsx
import React, { useState } from 'react';

export default function BudgetRangeSelector({ onSelect, onNext }) {
  const [budget, setBudget] = useState(1000);
  const [confirmed, setConfirmed] = useState(false);

  const handleChange = (e) => {
    const value = parseInt(e.target.value);
    setBudget(value);
    setConfirmed(true);
    onSelect(value);
  };

  return (
    <div className="budget-selector">
      <h2>Select Your Budget</h2>
      <input
        type="range"
        min="500"
        max="2000"
        step="50"
        value={budget}
        onChange={handleChange}
      />
      <div>€{budget}</div>
      <button
        className={`next-button ${confirmed ? 'active' : 'disabled'}`}
        onClick={onNext}
        disabled={!confirmed}
      >
        Next
      </button>
    </div>
  );
}
