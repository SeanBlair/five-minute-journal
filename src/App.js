import React from 'react';
import update from 'immutability-helper';
import './App.css';
import Question from './Question';
import JOURNAL_ENTRIES from './journalEntriesData';
import JournalEntry from './JournalEntry';
import journalQuestions from './journal-questions';

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

  // TODO: Use "Today" for today's entry, "Monday, October 7th" for yesterday and previous

  // TODO: Color different day's slightly different. Also color same day's morning / night
  // sections slightly different.

  constructor(props) {
    super(props);
    this.questions = [
      journalQuestions.gratefulFor,
      journalQuestions.todayGreat,
      journalQuestions.affirmations,
      journalQuestions.amazing,
      journalQuestions.better
    ];
    this.currentQuestion = 0;
    this.state = {
      question: this.questions[this.currentQuestion],
      journalEntries: JOURNAL_ENTRIES
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(name, value) {
    const question = update(this.state.question, {
      answers: { [name]: { $set: value } }
    });
    this.setState({
      question
    });
  }

  handleSubmit() {
    if (this.currentQuestion === this.questions.length - 1) {
      this.currentQuestion = 0;
    } else {
      this.currentQuestion++;
    }
    this.setState({
      question: this.questions[this.currentQuestion]
    });
  }

  render() {
    return (
      <div className="page">
        <h1 className="title">My Five Minute Journal </h1>
        <Question
          text={this.state.question.text}
          answers={this.state.question.answers}
          onInputChange={this.handleInputChange}
          onSubmit={this.handleSubmit}
        />
        <hr />
        <div className="answers">
          {this.state.journalEntries.map(entry => (
            <JournalEntry value={entry} />
          ))}
        </div>
      </div>
    );
  }
}

export default App;
