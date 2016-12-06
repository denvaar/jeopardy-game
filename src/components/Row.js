import React, { Component } from 'react';
import { connect } from 'react-redux';

import QuestionCell from './QuestionCell';


class Row extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let cells = [];
    for (let i = 0; i < 6; i++) {
      let category = Object.keys(this.props.categories)[i];
      let isAnswered = this.props.categories[category].find(q => {return q.value === this.props.value }).isAnswered;
      cells.push(
        <QuestionCell key={i}
                      value={this.props.value}
                      isAnswered={isAnswered}
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

const mapStateToProps = (state) => {
  return {
    categories: state.appReducer.game.categories        
  };
}

export default connect(mapStateToProps, {})(Row);
