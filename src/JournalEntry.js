import React from 'react';
import NightEntry from './NightEntry';
import MorningEntry from './MorningEntry';

function JournalEntry(props) {
  return (
    <div>
      {props.value.date && <h2>{props.value.date}</h2>}
      {props.value.nightEntry && <NightEntry value={props.value.nightEntry} />}
      <hr />
      {props.value.morningEntry && (
        <MorningEntry value={props.value.morningEntry} />
      )}
      <hr />
    </div>
  );
}

export default JournalEntry;
