import React, { useState } from 'react';
import WelcomeScreen from './WelcomeScreen';
import FormController from './components/FormController';

function App() {
  const [started, setStarted] = useState(false);

  return (
    <div className="App">
      {started ? (
        <FormController />
      ) : (
        <WelcomeScreen onStart={() => setStarted(true)} />
      )}
    </div>
  );
}

export default App;
