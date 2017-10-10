import React, { Component } from 'react';
import { connect } from 'react-redux';

import QuestionCell from './QuestionCell';


class Row extends Component {

  render() {
    const cells = [];
    for (let i = 0; i < 6; i++) {
      const category = this.props.categories[i][0].category;
      const isAnswered = this.props.categories[i].find(q => {return q.value === this.props.value }).isAnswered;
      cells.push(
        <QuestionCell key={i}
          value={this.props.value}
          isAnswered={isAnswered}
          openQuestion={this.props.openQuestion}
          category={Object.keys(this.props.categories)[i]}
        />
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
  const currentVersion = state.appReducer.currentVersion;

  return {
    categories: state.appReducer.game[currentVersion].categories,
    currentVersion
  };
}

export default connect(mapStateToProps, {})(Row);
