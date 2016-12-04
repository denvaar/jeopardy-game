import React, { Component } from 'react';


class Question extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    // <div className="question" onClick={() => {this.props.closeQuestion()} }>{this.props.question.question}</div>
    return (
      <div className="question">{this.props.question.question}</div>
    );
  }
}

export default Question;
