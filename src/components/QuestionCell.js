import React, { Component } from 'react';


class QuestionCell extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let markup = <td onClick={() => {this.props.openQuestion(this.props.category, this.props.value);} }>${this.props.value}</td>;
    if (this.props.isAnswered) {
      markup = <td></td>;
    }
    return markup;
  }
}

export default QuestionCell;
