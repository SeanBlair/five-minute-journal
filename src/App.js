import React from 'react';
import update from 'immutability-helper';
import './App.css';
import Question from './Question';
import JournalEntry from './JournalEntry';
import journalQuestions from './journal-questions';
import DEMO_ENTRIES_2_DAYS from './demoEntriesTwoDays';

class App extends React.Component {
  // TODO refactor for clarity
  // TODO add button that is only visible for guest, that adds two days of generic entries.
  // TODO: color same day's morning / night sections slightly different?
  constructor(props) {
    super(props);
    this.questions = [
      journalQuestions.gratefulFor,
      journalQuestions.todayGreat,
      journalQuestions.affirmations,
      journalQuestions.amazing,
      journalQuestions.better
    ];
    this.genericUsername = 'Guest';
    this.currentUserKey = 'currentUser';
    this.currentUser = localStorage.getItem(this.currentUserKey);
    // First time app used from this browser.
    if (!this.currentUser) {
      this.currentUser = this.genericUsername;
      this.userJournal = {
        currentQuestionIndex: 0,
        entries: DEMO_ENTRIES_2_DAYS
      };
    } else {
      this.userJournal = JSON.parse(localStorage.getItem(this.currentUser));
    }
    this.currentQuestionIndex = this.userJournal.currentQuestionIndex;
    const currentQuestion = this.getCurrentQuestion(this.userJournal.entries);
    // This stores state that determines ui elements
    this.state = {
      user: this.currentUser,
      question: currentQuestion,
      journalEntries: this.userJournal.entries
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.clearHistoricJournalState = this.clearHistoricJournalState.bind(this);
    this.signIn = this.signIn.bind(this);
    this.signOut = this.signOut.bind(this);
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
    this.userJournal = {
      currentQuestionIndex: this.currentQuestionIndex,
      entries: updatedEntries
    };
    localStorage.setItem(this.state.user, JSON.stringify(this.userJournal));
    const nextQuestion = this.getCurrentQuestion(updatedEntries);
    this.setState({
      question: nextQuestion,
      journalEntries: updatedEntries
    });
  }

  // Resets app by deleting localStorage data setting initial question
  clearHistoricJournalState() {
    this.currentQuestionIndex = 0;
    const emptyUserJournal = {
      currentQuestionIndex: this.currentQuestionIndex,
      entries: []
    };
    localStorage.setItem(this.state.user, JSON.stringify(emptyUserJournal));
    this.setState({
      question: JSON.parse(JSON.stringify(this.questions[this.currentQuestionIndex])),
      journalEntries: []
    });
  }

  signIn() {
    const user = prompt('Please enter your name', 'Joe Shmoe');
    localStorage.setItem(this.currentUserKey, user);
    this.userJournal = localStorage.getItem(user);
    if (!this.userJournal) {
      this.userJournal = {
        currentQuestionIndex: 0,
        entries: []
      };
    } else {
      this.userJournal = JSON.parse(this.userJournal);
      this.currentQuestionIndex = this.userJournal.currentQuestionIndex;
    }
    const question = this.getCurrentQuestion(this.userJournal.entries);
    this.setState({
      user,
      question,
      journalEntries: this.userJournal.entries
    });
  }

  signOut() {
    localStorage.setItem(this.currentUserKey, this.genericUsername);
    // TODO figure out best way to transition back to generic user:
    // Reset journal entries to DEMO_ENTRIES_2_DAYS or leave as was...
    // On page reload, show any generic user's saved changes or the 
    // static 2 days demo data.??  Idea, make it as similar to regular
    // users in order to demo all functionality withou showing people
    // personal journal entries.
    this.currentQuestionIndex = 0;
    this.setState({
      user: this.genericUsername,
      question: JSON.parse(JSON.stringify(this.questions[this.currentQuestionIndex])),
      journalEntries: DEMO_ENTRIES_2_DAYS
    });
  }

  render() {
    const isSignedIn = this.state.user !== this.genericUsername;
    const isSomeEntry = this.state.journalEntries.length > 0;
    return (
      <div className="page">
        <button onClick={this.signIn} className={isSignedIn ? 'hide' : 'show'}>
          Sign In
        </button>
        <button onClick={this.signOut} className={isSignedIn ? 'show' : 'hide'}>
          Sign Out
        </button>
        <h1 className="title">{this.state.user}&apos;s Five Minute Journal </h1>
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
            className={isSomeEntry ? 'visible' : 'hidden'}
          >
            Clear all entries
          </button>
        </div>
      </div>
    );
  }
}

export default App;
