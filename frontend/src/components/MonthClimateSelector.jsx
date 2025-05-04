import React, { useState } from 'react';
import './CardStyles.css';

const months = [
  { name: 'Jan', icon: '❄️' },
  { name: 'Feb', icon: '❄️' },
  { name: 'Mar', icon: '🌧️' },
  { name: 'Apr', icon: '🌦️' },
  { name: 'May', icon: '🌸' },
  { name: 'Jun', icon: '☀️' },
  { name: 'Jul', icon: '☀️' },
  { name: 'Aug', icon: '☀️' },
  { name: 'Sep', icon: '🍂' },
  { name: 'Oct', icon: '🌧️' },
  { name: 'Nov', icon: '🌫️' },
  { name: 'Dec', icon: '❄️' }
];

export default function MonthClimateSelector({ onNext }) {
  const [selectedMonths, setSelectedMonths] = useState([]);

  const toggleMonth = (month) => {
    const exists = selectedMonths.includes(month);
    const updated = exists
      ? selectedMonths.filter(m => m !== month)
      : [...selectedMonths, month];
    setSelectedMonths(updated);
  };

  return (
    <div className="month-selector">
      <h2>Select Preferred Months or Climate</h2>
      <div className="month-grid">
        {months.map(({ name, icon }) => (
          <button
            key={name}
            className={`month-circle ${selectedMonths.includes(name) ? 'selected' : ''}`}
            onClick={() => toggleMonth(name)}
          >
            {icon} {name}
          </button>
        ))}
      </div>
      <button
        className={`next-button ${selectedMonths.length ? 'active' : 'disabled'}`}
        onClick={() => onNext(selectedMonths)}
        disabled={!selectedMonths.length}
      >
        Next
      </button>
    </div>
  );
}
