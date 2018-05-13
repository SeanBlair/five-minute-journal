import React from 'react';
import journalQuestions from './journal-questions';

function MorningEntry(props) {
  return (
    <div>
      {props.value.gratefulFor && (
        <div>
          <h3>{journalQuestions.gratefulFor.text}</h3>
          {props.value.gratefulFor.map(answer => <p key={answer}>{answer}</p>)}
        </div>
      )}
      {props.value.todayGreat && (
        <div>
          <h3>{journalQuestions.todayGreat.text}</h3>
          {props.value.todayGreat.map(answer => <p key={answer}>{answer}</p>)}
        </div>
      )}
      {props.value.affirmations && (
        <div>
          <h3>{journalQuestions.affirmations.text}</h3>
          {props.value.affirmations.map(answer => <p key={answer}>{answer}</p>)}
        </div>
      )}
    </div>
  );
}

export default MorningEntry;
