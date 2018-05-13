import React from 'react';
import update from 'immutability-helper';
import './App.css';
import Question from './Question';
// import JOURNAL_ENTRIES from './journalEntriesData';
import JournalEntry from './JournalEntry';
import journalQuestions from './journal-questions';

class App extends React.Component {
  // TODO: select correct question to display given the time of day?

  // TODO: color same day's morning / night
  // sections slightly different?

  // TODO: Implement storage such that previous posts are displayed on page reload.

  constructor(props) {
    super(props);
    this.questions = [
      journalQuestions.gratefulFor,
      journalQuestions.todayGreat,
      journalQuestions.affirmations,
      journalQuestions.amazing,
      journalQuestions.better
    ];
    this.currentQuestion = undefined;
    let historicJournalEntries = localStorage.getItem('historicJournalEntries');
    if (!historicJournalEntries) {
      historicJournalEntries = { entries: []};
      this.currentQuestion = 0;
    } else {
      historicJournalEntries = JSON.parse(historicJournalEntries);
      this.currentQuestion = historicJournalEntries.currentQuestionNum;
    }
    this.state = {
      question: this.questions[this.currentQuestion],
      // journalEntries: JOURNAL_ENTRIES
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
    if (this.currentQuestion === this.questions.length - 1) {
      this.currentQuestion = 0;
    } else {
      this.currentQuestion++;
    }
    const today = new Date().toDateString();
    let newEntries;
    const question = this.state.question;
    const answers = [question.answers.first, question.answers.second];
    if (question.answers.third) {
      answers.push(question.answers.third);
    }

    if (this.state.journalEntries.length > 0) {
      const firstEntriesDate = this.state.journalEntries[0].date;
      if (today === firstEntriesDate) {
        if (!this.state.journalEntries[0].hasOwnProperty(question.type)) {
          newEntries = update(this.state.journalEntries, {
            // currentQuestionNum: { $set: this.currentQuestion },
            0: { [question.type]: { $set: {} } }
          });
          newEntries = update(newEntries, {
            0: { [question.type]: { [question.name]: { $set: answers } } }
          });
        } else {
          newEntries = update(this.state.journalEntries, {
            // currentQuestionNum: { $set: this.currentQuestion },
            0: {
              [question.type]: { [question.name]: { $set: answers } }
            }
          });
        }
      } else {
        const entry = {
          date: today,
          [question.type]: {
            [question.name]: answers
          }
        };
        newEntries = update(this.state.journalEntries, {
          // currentQuestionNum: { $set: this.currentQuestion },
          0: { $unshift: [entry] }
        });
      }
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
      question: this.questions[this.currentQuestion],
      journalEntries: newEntries
    });
    // any time a set of answers is submitted, update historicJournalEntries value in
    // localStorage. This will allow the page load to grab the latest state of the journal
    // for display.
    const storedEntries = {
      currentQuestionNum: this.currentQuestion,
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
