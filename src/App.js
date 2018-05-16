import React from 'react';
import update from 'immutability-helper';
import './App.css';
import Question from './Question';
import JournalEntry from './JournalEntry';
import journalQuestions from './journal-questions';

class App extends React.Component {
  // TODO: select correct question to display given the time of day?
  // TODO: color same day's morning / night
  // sections slightly different?
  // TODO: Add a button to set a couple days of entries for demoing a fresh app?
  constructor(props) {
    super(props);
    this.questions = [
      journalQuestions.gratefulFor,
      journalQuestions.todayGreat,
      journalQuestions.affirmations,
      journalQuestions.amazing,
      journalQuestions.better
    ];
    this.currentQuestionIndex = 0;
    // TODO: refactor this to function getHistoricJournalState();
    // Get journal state prior to this page load.
    let historicJournalState = localStorage.getItem('historicJournalState');
    // No previous journal entries saved.
    if (!historicJournalState) {
      historicJournalState = {
        currentQuestionIndex: this.currentQuestionIndex,
        entries: []
      };
    } else {
      historicJournalState = JSON.parse(historicJournalState);
      this.currentQuestionIndex = historicJournalState.currentQuestionIndex;
    }

    this.state = {
      question: this.questions[this.currentQuestionIndex],
      journalEntries: historicJournalState.entries
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.clearHistoricJournalState = this.clearHistoricJournalState.bind(this);
  }

  // Returns an array containg all the current question's answer strings
  getAnswersArray() {
    const answersArray = [
      this.state.question.answers.first,
      this.state.question.answers.second
    ];
    if (this.state.question.answers.third) {
      answersArray.push(this.state.question.answers.third);
    }
    return answersArray;
  }

  // Returns the current entries with the current question's answers added.
  getUpdatedEntries() {
    const today = new Date().toDateString();
    const answers = this.getAnswersArray();
    let updatedEntries;
    // First journal entry
    if (this.state.journalEntries.length === 0) {
      updatedEntries = [
        {
          date: today,
          [this.state.question.name]: answers
        }
      ];
    } else {
      const lastEntryDate = this.state.journalEntries[0].date;
      // First entry for today
      if (today !== lastEntryDate) {
        // add new entry to journalEntries
        updatedEntries = update(this.state.journalEntries, {
          $unshift: [{ date: today, [this.state.question.name]: answers }]
        });
      } else {
        // Today's entry has already been started.
        updatedEntries = update(this.state.journalEntries, {
          0: { [this.state.question.name]: { $set: answers } }
        });
      }
    }
    return updatedEntries;
  }

  // Sets the index of the next question to display.
  incrementCurrentQuestionIndex() {
    if (this.currentQuestionIndex === this.questions.length - 1) {
      this.currentQuestionIndex = 0;
    } else {
      this.currentQuestionIndex++;
    }
  }

  // Adds one character to one of the current question's answers
  handleInputChange(name, value) {
    const question = update(this.state.question, {
      answers: { [name]: { $set: value } }
    });
    this.setState({
      question
    });
  }

  // Adds the current question's answers to the journal, displays
  // the next question and updates the localStorage data.
  handleSubmit() {
    const updatedEntries = this.getUpdatedEntries();
    this.incrementCurrentQuestionIndex();
    // Create object for storing current state in localStorage
    const updatedJournalState = {
      currentQuestionIndex: this.currentQuestionIndex,
      entries: updatedEntries
    };
    localStorage.setItem(
      'historicJournalState',
      JSON.stringify(updatedJournalState)
    );
    this.setState({
      question: this.questions[this.currentQuestionIndex],
      journalEntries: updatedEntries
    });
  }

  // Resets app by deleting localStorage data setting initial question
  clearHistoricJournalState() {
    localStorage.clear();
    this.currentQuestionIndex = 0;
    this.setState({
      question: this.questions[this.currentQuestionIndex],
      journalEntries: []
    });
  }

  render() {
    const visibility =
      this.state.journalEntries.length === 0 ? 'hidden' : 'visible';
    return (
      <div className="page">
        <h1 className="title">My Five Minute Journal </h1>
        <Question
          text={this.state.question.text}
          answers={this.state.question.answers}
          onInputChange={this.handleInputChange}
          onSubmit={this.handleSubmit}
        />
        <div className="answers">
          {this.state.journalEntries.map((entry, index) => (
            <JournalEntry entry={entry} id={index} key={entry.date} />
          ))}
        </div>
        <div>
          <button
            onClick={this.clearHistoricJournalState}
            className={visibility}
          >
            Clear all entries
          </button>
        </div>
      </div>
    );
  }
}

export default App;
