import React from 'react';
import NightEntry from './NightEntry';
import MorningEntry from './MorningEntry';

function JournalEntry(props) {
  return (
    <div>
      <h2>{props.value.date}</h2>
      <NightEntry value={props.value.nightEntry} />
      <hr />
      <MorningEntry value={props.value.morningEntry} />
      <hr />
    </div>
  );
}

export default JournalEntry;
