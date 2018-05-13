import React from 'react';
import NightEntry from './NightEntry';
import MorningEntry from './MorningEntry';

function JournalEntry(props) {
  const evenOrOdd = props.id % 2 === 0 ? 'even' : 'odd';
  return (
    <div className={evenOrOdd}>
      {props.value.date && <h2>{props.value.date}</h2>}
      {props.value.nightEntry && <NightEntry value={props.value.nightEntry} />}
      {props.value.morningEntry && (
        <MorningEntry value={props.value.morningEntry} />
      )}
    </div>
  );
}

export default JournalEntry;
