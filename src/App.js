import React from 'react';
import './App.css';

function App() {
  return (
    <div className="page">
      <h1 className="title">My Five Minute Journal </h1>
      <div className="question">
        <h2>Today I am grateful for:</h2>
        <p>1)</p>
        <p>2)</p>
        <p>3)</p>
      </div>
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
