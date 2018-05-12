let yesterday = new Date();
let dayBefore = new Date();
dayBefore.setDate(dayBefore.getDate() - 2);
yesterday.setDate(yesterday.getDate() - 1);
yesterday = yesterday.toDateString();
dayBefore = dayBefore.toDateString();

const JOURNAL_ENTRIES = [
  {
    date: yesterday,
    nightEntry: {
      amazing: [
        'Did the tweaked out rock to fakie!',
        'Got a haircut appointment!',
        'Worked on my React app!'
      ],
      better: ['Work on resume', 'Work on cover letter']
    },
    morningEntry: {
      gratefulFor: ['Emily', 'Canada', 'EI'],
      todayGreat: [
        'Finish resume',
        'Work on five minute journal React app',
        'Do a tweaked out rock to fakie'
      ],
      affirmations: ['I am reasonably smart', "I'm a hard worker"]
    }
  },
  {
    date: dayBefore,
    nightEntry: {
      amazing: [
        'ljasdf lkjasd fflkj asdflk asdflk asdf',
        'lkasd lkjasdf lk sdalfkj asdf',
        'jklf;a ;lkjasdf lkjasdf asdf!'
      ],
      better: ['ljalsdkjflkasdf', 'lkjasdf']
    },
    morningEntry: {
      gratefulFor: ['lkjasdf', 'kjadsf', 'lkjasdf'],
      todayGreat: [
        'lkjasdf lkjasdf ',
        'lkjsdf lkjasdfoiuw lkjasdflk asdf',
        'blablalblalblalbla ba'
      ],
      affirmations: ['bla bla bal', 'bla bla bla blalbal']
    }
  }
];

export default JOURNAL_ENTRIES;
