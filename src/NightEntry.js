import React from 'react';
import journalQuestions from './journal-questions';

function NightEntry(props) {
  return (
    <div>
      {props.value.amazing && (
        <div>
          <h3>{journalQuestions.amazing.text}</h3>
          {props.value.amazing.map(answer => <p key={answer}>{answer}</p>)}
        </div>
      )}
      {props.value.better && (
        <div>
          <h3>{journalQuestions.better.text}</h3>
          {props.value.better.map(answer => <p key={answer}>{answer}</p>)}
        </div>
      )}
    </div>
  );
}

export default NightEntry;
