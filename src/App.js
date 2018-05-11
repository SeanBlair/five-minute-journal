import React from 'react';
import './App.css';
import Question from './Question';
import JOURNAL_ENTRIES from './journalEntriesData';
import JournalEntry from './JournalEntry';

function App() {
  return (
    <div className="page">
      <h1 className="title">My Five Minute Journal </h1>
      <Question text="Today I am grateful for:" />
      <hr />
      <div className="answers">
        {JOURNAL_ENTRIES.map(entry => <JournalEntry value={entry} />)}
      </div>
    </div>
  );
}

export default App;
