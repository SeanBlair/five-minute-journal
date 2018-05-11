import React from 'react';

class Question extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      answer1: '',
      answer2: ''
    };
    if (this.props.numAnswers === 3) {
      this.state.answer3 = '';
    }
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(event) {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {
    alert(`Just submitted a journal question with the following answers ${
      this.state.answer1
    }, ${this.state.answer2}${
      this.state.answer3 ? `, ${this.state.answer3}` : ''
    }`);
    event.preventDefault();
  }

  render() {
    return (
      <div className="question">
        <h2>{this.props.text}</h2>
        <form onSubmit={this.handleSubmit}>
          <p>
            1){'  '}
            <input
              name="answer1"
              type="text"
              value={this.state.answer1}
              onChange={this.handleInputChange}
            />
          </p>
          <p>
            2){'  '}
            <input
              name="answer2"
              type="text"
              value={this.state.answer2}
              onChange={this.handleInputChange}
            />
          </p>
          {this.props.numAnswers === 3 && (
            <p>
              3){'  '}
              <input
                name="answer3"
                type="text"
                value={this.state.answer3}
                onChange={this.handleInputChange}
              />
            </p>
          )}
          <input type="submit" value="Add" />
        </form>
      </div>
    );
  }
}

export default Question;
