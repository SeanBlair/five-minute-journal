import React from 'react';
import './App.css';
import Question from './Question';
import JOURNAL_ENTRIES from './journalEntriesData';
import JournalEntry from './JournalEntry';

class App extends React.Component {
  // app will have the state because it gets modified from Question
  // and needs to update the journal entries div.
  // the state will get loaded from HTML local storage on page load...
  // on update both the local storage and the state will get modified.
  // App will know which is the next Question to display.

  // TODO: implement adding new entry. Basically show a specific question,
  // implement a 'submit' handler that adds a new entry in state.
  // On new entry submitted, either create new entry if first question
  // answered of today, or add to already existing entry.

  // TODO: select correct question to display given the questions entered,
  // the time of day.
  constructor(props) {
    super(props);
    this.state = JOURNAL_ENTRIES;
  }
  render() {
    return (
      <div className="page">
        <h1 className="title">My Five Minute Journal </h1>
        <Question text="Today I am grateful for:" />
        <hr />
        <div className="answers">
          {this.state.map(entry => <JournalEntry value={entry} />)}
        </div>
      </div>
    );
  }
}

export default App;
