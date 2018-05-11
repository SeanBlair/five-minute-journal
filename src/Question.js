import React from 'react';

class Question extends React.Component {
  constructor(props) {
    super(props);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // handleInputChange(event) {
  //   const name = event.target.name;
  //   const value = event.target.value;
  //   this.setState({
  //     [name]: value
  //   });
  // }

  handleInputChange(event) {
    const name = event.target.name;
    const value = event.target.value;
    this.props.onInputChange(name, value);
  }

  handleSubmit(event) {
    this.props.onSubmit();
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
              name="first"
              type="text"
              value={this.props.answers.first}
              onChange={this.handleInputChange}
            />
          </p>
          <p>
            2){'  '}
            <input
              name="second"
              type="text"
              value={this.props.answers.second}
              onChange={this.handleInputChange}
            />
          </p>
          {this.props.answers.third && (
            <p>
              3){'  '}
              <input
                name="third"
                type="text"
                value={this.state.answers.third}
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
