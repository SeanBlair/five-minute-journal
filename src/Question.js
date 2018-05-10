import React from 'react';

function Question(props) {
  return (
    <div className="question">
      <h2>{props.text}</h2>
      <form>
        <p>
          1){'  '} <input type="text" />
        </p>
        <p>
          2){'  '} <input type="text" />
        </p>
        <p>
          3){'  '} <input type="text" />
        </p>
        <input type="submit" value="add" />
      </form>
    </div>
  );
}

export default Question;
