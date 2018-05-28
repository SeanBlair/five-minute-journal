import React from 'react';
import update from 'immutability-helper';
import './App.css';
import Question from './Question';
import JournalEntry from './JournalEntry';
import journalQuestions from './journal-questions';

class App extends React.Component {
  // TODO: Implement different users that can sign in and see their entries.
  // TODO: color same day's morning / night sections slightly different?
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
    let journalState = localStorage.getItem('historicJournalState');
    if (!journalState) {
      journalState = {
        currentQuestionIndex: 0,
        entries: []
      };
    } else {
      journalState = JSON.parse(journalState);
    }
    this.currentQuestionIndex = journalState.currentQuestionIndex;
    const currentQuestion = this.getCurrentQuestion(journalState.entries);
    this.state = {
      question: currentQuestion,
      journalEntries: journalState.entries
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.clearHistoricJournalState = this.clearHistoricJournalState.bind(this);
  }

  // Returns the current question with previous answers if they exist.
  getCurrentQuestion(entries) {
    const currentQuestion = JSON.parse(JSON.stringify(this.questions[this.currentQuestionIndex]));
    if (entries.length > 0 && entries[0].date === new Date().toDateString()) {
      const previousAnswers = entries[0][currentQuestion.name];
      if (previousAnswers) {
        currentQuestion.answers.first = previousAnswers[0];
        currentQuestion.answers.second = previousAnswers[1];
        if (currentQuestion.answers.third !== undefined) {
          currentQuestion.answers.third = previousAnswers[2];
        }
      }
    }
    return currentQuestion;
  }

  // Returns an array containg all the current question's answer strings
  getAnswersArray() {
    const answersArray = [];
    Object.values(this.state.question.answers).forEach(answer =>
      answersArray.push(answer));
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
    const nextQuestion = this.getCurrentQuestion(updatedEntries);
    this.setState({
      question: nextQuestion,
      journalEntries: updatedEntries
    });
  }

  // Resets app by deleting localStorage data setting initial question
  clearHistoricJournalState() {
    localStorage.clear();
    this.currentQuestionIndex = 0;
    this.setState({
      question: JSON.parse(JSON.stringify(this.questions[this.currentQuestionIndex])),
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
