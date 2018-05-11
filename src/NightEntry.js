import React from 'react';

function NightEntry(props) {
  return (
    <div>
      {props.value.amazing && (
        <div>
          <h2>Amazing things that happened today</h2>
          {props.value.amazing.map(answer => <p>{answer}</p>)}
        </div>
      )}
      {props.value.better && (
        <div>
          <h2>What would have made today even better?</h2>
          {props.value.better.map(answer => <p>{answer}</p>)}
        </div>
      )}
    </div>
  );
}

export default NightEntry;
