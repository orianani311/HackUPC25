import React from 'react';
import './StepProgress.css';

const StepProgress = ({ currentStep }) => {
  const steps = ['Prompt', 'Images', 'Summary'];

  return (
    <div className="progress-container">
      {steps.map((label, index) => (
        <div key={index} className={`step ${index <= currentStep ? 'active' : ''}`}>
          <div className="circle">{index + 1}</div>
          <div className="label">{label}</div>
          {index < steps.length - 1 && <div className="bar" />}
        </div>
      ))}
    </div>
  );
};

export default StepProgress;
