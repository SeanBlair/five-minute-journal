const journalQuestions = {
  gratefulFor: {
    name: 'gratefulFor',
    type: 'morningEntry',
    text: 'Today I am grateful for...',
    answers: { first: '', second: '', third: '' }
  },
  todayGreat: {
    name: 'todayGreat',
    type: 'morningEntry',
    text: "Here's what would make today great...",
    answers: { first: '', second: '', third: '' }
  },
  affirmations: {
    type: 'morningEntry',
    name: 'affirmations',
    text: "Today's Affirmations: I am...",
    answers: { first: '', second: '' }
  },
  amazing: {
    name: 'amazing',
    type: 'nightEntry',
    text: 'Here are 3 amazing things that happened today...',
    answers: { first: '', second: '', third: '' }
  },
  better: {
    name: 'better',
    type: 'nightEntry',
    text: 'What could I have done to make today even better?',
    answers: { first: '', second: '' }
  }
};

export default journalQuestions;
