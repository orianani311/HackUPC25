import React from 'react';
import './WelcomeScreen.css';

function WelcomeScreen({ onStart }) {
  return (
    <div className="welcome-container">
      <div className="card-stack">
        <div className="card white">#wanderlust</div>
        <div className="card white">Art. Food. Football.</div>
        <div className="card white">€ Low Budget Chaos</div>
        <div className="card black">What’s your perfect trip?</div>
      </div>

      <div className="text-section">
        <h1 className="title">CardVoyage</h1>
        <p className="subtitle">
          A travel game for chaotic friends with questionable taste. <br />
          Build your mystery travel card. Vote. Reveal. Regret. Repeat.
        </p>
        <button className="start-button" onClick={onStart}>
          Start the Game
        </button>
      </div>
    </div>
  );
}

export default WelcomeScreen;

