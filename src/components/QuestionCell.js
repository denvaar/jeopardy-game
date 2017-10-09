import React, { Component } from 'react';

export default props => {
  if(props.isAnswered) {
    return <td></td>
  }
  return <td onClick={() => {props.openQuestion(props.category, props.value);} }>${props.value}</td>
}

// class QuestionCell extends Component {
//   constructor(props) {
//     super(props);
//   }

//   render() {
//     let markup = <td onClick={() => {this.props.openQuestion(this.props.category, this.props.value);} }>${this.props.value}</td>;
//     if (this.props.isAnswered) {
//       markup = <td></td>;
//     }
//     return markup;
//   }
// }

// export default QuestionCell;
