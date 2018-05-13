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

  // TODO: Refactor for clarity and maintainability!!!
  // TODO: Add button to clear all journal entries from localStorage.
  // TODO: Fix answers border-radius when entry not full.
  // TODO: Consider rethinking state + stored data to minimize moving parts.
  // Re read https://reactjs.org/docs/thinking-in-react.html  prefer

  // TODO: focus on first answer of new question on submit.

  constructor(props) {
    super(props);
    this.questions = [
      journalQuestions.gratefulFor,
      journalQuestions.todayGreat,
      journalQuestions.affirmations,
      journalQuestions.amazing,
      journalQuestions.better
    ];
    // TODO: probably do not need this field as the info will always be
    // available and correct in localStorage.getItem('historicJournalEntries').currentQuestionNum
    // but don't want to query localStorage for next question num!!!
    this.currentQuestionIndex = 0;
    // Get journal state prior to this page load.
    let historicJournalEntries = localStorage.getItem('historicJournalEntries');
    // No previous journal entries saved.
    if (!historicJournalEntries) {
      historicJournalEntries = { entries: [] };
    } else {
      historicJournalEntries = JSON.parse(historicJournalEntries);
      this.currentQuestionIndex = historicJournalEntries.currentQuestionNum;
    }

    this.state = {
      question: this.questions[this.currentQuestionIndex],
      journalEntries: historicJournalEntries.entries
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
    if (this.currentQuestionIndex === this.questions.length - 1) {
      this.currentQuestionIndex = 0;
    } else {
      this.currentQuestionIndex++;
    }
    const today = new Date().toDateString();
    let newEntries;
    const question = this.state.question;
    // answers to add
    const answers = [question.answers.first, question.answers.second];
    if (question.answers.third) {
      answers.push(question.answers.third);
    }

    // Not first journal entry...  Is this necessary??
    if (this.state.journalEntries.length > 0) {
      const firstEntriesDate = this.state.journalEntries[0].date;
      // Today's entry already started.
      if (today === firstEntriesDate) {
        // this can be avoided if initialized with both nightEntry and morningEntry
        if (!this.state.journalEntries[0].hasOwnProperty(question.type)) {
          newEntries = update(this.state.journalEntries, {
            0: { [question.type]: { $set: {} } }
          });
          // add new question + answers
          newEntries = update(newEntries, {
            0: { [question.type]: { [question.name]: { $set: answers } } }
          });
          // see above to eliminate this duplicate code.
        } else {
          newEntries = update(this.state.journalEntries, {
            0: { [question.type]: { [question.name]: { $set: answers } } }
          });
        }
        // first entry for Today
      } else {
        // TODO: initialize both questionType objects to avoid extra logic above
        const entry = {
          date: today,
          [question.type]: {
            [question.name]: answers
          }
        };
        // add new entry to journalEntries
        newEntries = update(this.state.journalEntries, {
          0: { $unshift: [entry] }
        });
      }
      // this seems unnecessary
    } else {
      newEntries = [
        {
          date: today,
          [question.type]: {
            [question.name]: answers
          }
        }
      ];
    }
    this.setState({
      question: this.questions[this.currentQuestionIndex],
      journalEntries: newEntries
    });
    // prepare to update entries in localStorage
    const storedEntries = {
      currentQuestionNum: this.currentQuestionIndex,
      entries: newEntries
    };
    localStorage.setItem(
      'historicJournalEntries',
      JSON.stringify(storedEntries)
    );
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
        <div className="answers">
          {this.state.journalEntries.map((entry, index) => (
            <JournalEntry value={entry} id={index} key={entry.date} />
          ))}
        </div>
      </div>
    );
  }
}

export default App;
