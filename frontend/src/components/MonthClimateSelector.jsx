import React, { useState } from 'react';
import './CardStyles.css';

const months = [
  { name: 'Jan', icon: '❄️' },
  { name: 'Feb', icon: '❄️' },
  { name: 'Mar', icon: '☔' },
  { name: 'Apr', icon: '☔' },
  { name: 'May', icon: '☀️' },
  { name: 'Jun', icon: '☀️' },
  { name: 'Jul', icon: '☀️' },
  { name: 'Aug', icon: '☀️' },
  { name: 'Sep', icon: '🍂' },
  { name: 'Oct', icon: '🍂' },
  { name: 'Nov', icon: '❄️' },
  { name: 'Dec', icon: '❄️' },
];

export default function MonthClimateSelector({ onSelect, onNext }) {
  const [selectedMonths, setSelectedMonths] = useState([]);

  const toggleMonth = (name) => {
    const updated = selectedMonths.includes(name)
      ? selectedMonths.filter((m) => m !== name)
      : [...selectedMonths, name];
    setSelectedMonths(updated);
    onSelect(updated);
  };

  return (
    <div className="month-selector">
      <h2 className="month-title">Select Preferred Months or Climate</h2>
      <div className="month-grid">
        {months.map(({ name, icon }) => (
          <button
            key={name}
            className={`month-button ${selectedMonths.includes(name) ? 'selected' : ''}`}
            onClick={() => toggleMonth(name)}
          >
            {icon} {name}
          </button>
        ))}
      </div>
      <div className="navigation-buttons">
        <button
          className={`next-button ${selectedMonths.length ? 'active' : 'disabled'}`}
          onClick={onNext}
          disabled={!selectedMonths.length}
        >
          Next
        </button>
      </div>
    </div>
  );
}
