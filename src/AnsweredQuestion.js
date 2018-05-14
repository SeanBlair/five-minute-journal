import React from 'react';

function AnsweredQuestion(props) {
  return (
    <div>
      <h3>{props.question}</h3>
      {props.answers.map(answer => <p key={answer}>{answer}</p>)}
    </div>
  );
}

export default AnsweredQuestion;
