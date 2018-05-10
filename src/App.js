import React from 'react';
import './App.css';
import Question from './Question';

function App() {
  return (
    <div className="page">
      <Question text="Today I am greatful for:" />
      <hr />
      <div className="answers">
        <div className="answer">
          <h2>Yesterday I was grateful for:</h2>
          <p>Emily :)</p>
          <p>Canada</p>
          <p>EI</p>
        </div>
        <div className="answer">
          <h2>What would make yesterday great was:</h2>
          <p>Finish resume</p>
          <p>Start five minute journal React app</p>
          <p>Do a tweaked out rock to fakie.</p>
        </div>
        <div className="answer">
          <h2>My affirmations yesterday where:</h2>
          <p>I am reasonably smart</p>
          <p>I am a hard worker</p>
          <p>I have intentions of being kind</p>
        </div>
      </div>
    </div>
  );
}

export default App;
