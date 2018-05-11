import React from 'react';
import './App.css';
import Question from './Question';
import JOURNAL_ENTRIES from './journalEntriesData';
import JournalEntry from './JournalEntry';

function App() {
  // app will have the state because it gets modified from Question
  // and needs to update the journal entries div.
  // the state will get loaded from HTML local storage on page load...
  // on update both the local storage and the state will get modified.
  // App will know which is the next Question to display.

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
