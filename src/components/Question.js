import React, { Component } from 'react';


class Question extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="question" onClick={() => {this.props.closeQuestion()} }>{this.props.question.question}</div>
    );
  }
}

export default Question;
