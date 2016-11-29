import React, { Component } from 'react';


class QuestionCell extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <td onClick={() => {this.props.openQuestion(this.props.category, this.props.value);} }>
        ${this.props.value}
      </td>
    );
  }
}

export default QuestionCell;
