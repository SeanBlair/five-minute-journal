import React from 'react';

class Question extends React.Component {
  constructor(props) {
    super(props);
    this.textInput = React.createRef();
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(event) {
    const name = event.target.name;
    const value = event.target.value;
    this.props.onInputChange(name, value);
  }

  handleSubmit(event) {
    this.props.onSubmit();
    event.preventDefault();
    this.textInput.current.focus();
  }

  render() {
    return (
      <div className="question">
        <h2>{this.props.text}</h2>
        <form onSubmit={this.handleSubmit}>
          <p>
            <input
              name="first"
              type="text"
              value={this.props.answers.first}
              onChange={this.handleInputChange}
              ref={this.textInput}
            />
          </p>
          <p>
            <input
              name="second"
              type="text"
              value={this.props.answers.second}
              onChange={this.handleInputChange}
            />
          </p>
          {this.props.answers.hasOwnProperty('third') && (
            <p>
              <input
                name="third"
                type="text"
                value={this.props.answers.third}
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
