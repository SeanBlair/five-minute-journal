import React from 'react';
import journalQuestions from './journal-questions';
import AnsweredQuestion from './AnsweredQuestion';

function JournalEntry(props) {
  const evenOrOdd = props.entry.id % 2 === 0 ? 'even' : 'odd';
  return (
    <div className={evenOrOdd}>
      <h2>{props.entry.date}</h2>
      {props.entry.amazing && (
        <AnsweredQuestion
          question={journalQuestions.amazing.text}
          answers={props.entry.amazing}
        />
      )}
      {props.entry.better && (
        <AnsweredQuestion
          question={journalQuestions.better.text}
          answers={props.entry.better}
        />
      )}
      {props.entry.gratefulFor && (
        <AnsweredQuestion
          question={journalQuestions.gratefulFor.text}
          answers={props.entry.gratefulFor}
        />
      )}
      {props.entry.todayGreat && (
        <AnsweredQuestion
          question={journalQuestions.todayGreat.text}
          answers={props.entry.todayGreat}
        />
      )}
      {props.entry.affirmations && (
        <AnsweredQuestion
          question={journalQuestions.affirmations.text}
          answers={props.entry.affirmations}
        />
      )}
    </div>
  );
}

export default JournalEntry;
