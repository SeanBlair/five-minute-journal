let yesterday = new Date();
let dayBeforeYesterday = new Date();
dayBeforeYesterday.setDate(dayBeforeYesterday.getDate() - 2);
yesterday.setDate(yesterday.getDate() - 1);
yesterday = yesterday.toDateString();
dayBeforeYesterday = dayBeforeYesterday.toDateString();

const DEMO_ENTRIES_2_DAYS = [
  {
    date: yesterday,
    amazing: [
      'Did the phsysical activity goal I have been working on for a while!',
      'Got a haircut appointment!',
      'Worked on my React app!'
    ],
    better: ['Work on resume', 'Work on cover letter'],
    gratefulFor: ['My friends', 'My home', 'Good people'],
    todayGreat: [
      'Finish all the tasks on my TODO list',
      'Work on five minute journal React app',
      'Do the physical activity goal I have been working on lately'
    ],
    affirmations: ['reasonably smart', 'a hard worker']
  },
  {
    date: dayBeforeYesterday,
    amazing: [
      'Finished that super important thing that was on my TODO list for a while',
      'Did a bunch of coding practice',
      'Had a great time working out at the skatepark'
    ],
    better: ['Go surfing', 'Cooked my better half a delicious dinner'],
    gratefulFor: ['My job', 'My hobby', 'My family'],
    todayGreat: [
      'Get that one super important thing done',
      'Work on my software development skills',
      'Have an awesome workout'
    ],
    affirmations: ['mostly healthy', 'generally kind']
  }
];

export default DEMO_ENTRIES_2_DAYS;
