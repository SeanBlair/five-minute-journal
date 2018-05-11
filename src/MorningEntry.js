import React from 'react';
import journalQuestions from './journal-questions';

function MorningEntry(props) {
  return (
    <div>
      {props.value.gratefulFor && (
        <div>
          <h2>{journalQuestions.gratefulFor.text}</h2>
          {props.value.gratefulFor.map(answer => <p>{answer}</p>)}
        </div>
      )}
      {props.value.todayGreat && (
        <div>
          <h2>{journalQuestions.todayGreat.text}</h2>
          {props.value.todayGreat.map(answer => <p>{answer}</p>)}
        </div>
      )}
      {props.value.affirmations && (
        <div>
          <h2>{journalQuestions.affirmations.text}</h2>
          {props.value.affirmations.map(answer => <p>{answer}</p>)}
        </div>
      )}
    </div>
  );
}

export default MorningEntry;
