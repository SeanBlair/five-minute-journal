import React from 'react';
import './App.css';
import Question from './Question';
import Answer from './Answer';

function App() {
  return (
    <div className="page">
      <h1 className="title">My Five Minute Journal </h1>
      <Question text="Today I am greatful for:" />
      <hr />
      <div className="answers">
        <Answer
          question="Yesterday I was greatful for:"
          answers={['Emily', 'Canada', 'EI']}
        />
        <Answer
          question="What would make yesterday great was:"
          answers={[
            'Finish resume',
            'Start five minute journal React app',
            'Do a tweaked out rock to fakie',
          ]}
        />
        <Answer
          question="My affirmations yesterday where:"
          answers={[
            'I am reasonably smart',
            'I am a hard worker',
            'I have intentions of being kind',
          ]}
        />
      </div>
    </div>
  );
}

export default App;
