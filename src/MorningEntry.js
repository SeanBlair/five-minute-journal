import React from 'react';

function MorningEntry(props) {
  return (
    <div>
      {props.value.gratefulFor && (
        <div>
          <h2>Today I am grateful for...</h2>
          {props.value.gratefulFor.map(answer => <p>{answer}</p>)}
        </div>
      )}
      {props.value.todayGreat && (
        <div>
          <h2>Here&apos;s what would make today great...</h2>
          {props.value.todayGreat.map(answer => <p>{answer}</p>)}
        </div>
      )}
      {props.value.affirmations && (
        <div>
          <h2>Today&apos;s affirmations: I am...</h2>
          {props.value.affirmations.map(answer => <p>{answer}</p>)}
        </div>
      )}
    </div>
  );
}

export default MorningEntry;
