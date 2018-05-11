import React from 'react';

function Answer(props) {
  return (
    <div className="answer">
      <h2>{props.question}</h2>
      <p>{props.answers[0]}</p>
      <p>{props.answers[1]}</p>
      <p>{props.answers[2]}</p>
    </div>
  );
}

export default Answer;
