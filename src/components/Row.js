import React, { Component } from 'react';

import QuestionCell from './QuestionCell';


class Row extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let cells = [];
    for (let i = 0; i < 6; i++) {
      cells.push(
        <QuestionCell key={i}
                      value={this.props.value}
                      openQuestion={this.props.openQuestion}
                      category={Object.keys(this.props.categories)[i]} />
      );
    }
    return (
      <tr>
        {cells}
      </tr>
    );
  }
}

export default Row;
