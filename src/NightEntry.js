import React from 'react';
import journalQuestions from './journal-questions';

function NightEntry(props) {
  return (
    <div>
      {props.value.amazing && (
        <div>
          <h2>{journalQuestions.amazing.text}</h2>
          {props.value.amazing.map(answer => <p>{answer}</p>)}
        </div>
      )}
      {props.value.better && (
        <div>
          <h2>{journalQuestions.better.text}</h2>
          {props.value.better.map(answer => <p>{answer}</p>)}
        </div>
      )}
    </div>
  );
}

export default NightEntry;
