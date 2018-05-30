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
  // TODO: Make first entry in list alternate colors, do not recompute based on
  // location in entries array, set as a function of the array length when created.
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
    let currentUser = localStorage.getItem(this.currentUserKey);
    // First time app used from this browser. Set demo state.
    if (!currentUser) {
      currentUser = this.genericUsername;
      this.userJournal = {
        currentQuestionIndex: 0,
        entries: DEMO_ENTRIES_2_DAYS
      };
      // Set initial localStorage data
      localStorage.setItem(this.currentUserKey, currentUser);
      localStorage.setItem(currentUser, JSON.stringify(this.userJournal));
    } else {
      this.userJournal = JSON.parse(localStorage.getItem(currentUser));
    }
    // This stores state that determines ui elements
    this.state = {
      user: currentUser,
      question: this.getCurrentQuestion(),
      journalEntries: this.userJournal.entries
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.clearAllUserJournalEntries = this.clearAllUserJournalEntries.bind(this);
    this.signIn = this.signIn.bind(this);
    this.signOut = this.signOut.bind(this);
  }

  // Returns a new object representing the current question with
  // previous answers if they have already been answered today.
  getCurrentQuestion() {
    let currentQuestion = this.questions[this.userJournal.currentQuestionIndex];
    currentQuestion = JSON.parse(JSON.stringify(currentQuestion));
    const entries = this.userJournal.entries;
    if (entries.length > 0 && entries[0].date === new Date().toDateString()) {
      const previousAnswers = entries[0][currentQuestion.name];
      // TODO clean up this code to not use hard coded indexes.
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

  // Returns the index of the next question to display.
  getNextQuestionIndex() {
    if (this.userJournal.currentQuestionIndex === this.questions.length - 1) {
      return 0;
    }
    return this.userJournal.currentQuestionIndex + 1;
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
    this.userJournal = {
      currentQuestionIndex: this.getNextQuestionIndex(),
      entries: this.getUpdatedEntries()
    };
    localStorage.setItem(this.state.user, JSON.stringify(this.userJournal));
    this.setState({
      question: this.getCurrentQuestion(),
      journalEntries: this.userJournal.entries
    });
  }

  // Resets user's journal by deleting all previous entries.
  clearAllUserJournalEntries() {
    this.userJournal = {
      currentQuestionIndex: 0,
      entries: []
    };
    localStorage.setItem(this.state.user, JSON.stringify(this.userJournal));
    this.setState({
      question: JSON.parse(JSON.stringify(this.questions[0])),
      journalEntries: []
    });
  }

  // Shows a prompt for user to enter name, display the user's journal
  signIn() {
    const user = prompt('Please enter your name', 'Joe Shmoe');
    localStorage.setItem(this.currentUserKey, user);
    this.userJournal = localStorage.getItem(user);
    if (!this.userJournal) {
      this.userJournal = {
        currentQuestionIndex: 0,
        entries: []
      };
      localStorage.setItem(user, JSON.stringify(this.userJournal));
    } else {
      this.userJournal = JSON.parse(this.userJournal);
    }
    this.setState({
      user,
      question: this.getCurrentQuestion(),
      journalEntries: this.userJournal.entries
    });
  }

  // Displays the generic user's journal
  signOut() {
    localStorage.setItem(this.currentUserKey, this.genericUsername);
    this.userJournal = JSON.parse(localStorage.getItem(this.genericUsername));
    this.setState({
      user: this.genericUsername,
      question: this.getCurrentQuestion(),
      journalEntries: this.userJournal.entries
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
            onClick={this.clearAllUserJournalEntries}
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
