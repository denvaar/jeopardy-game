import React from 'react';

// Made into a pure function, as class notation was not necessary
export default props => {
  if(props.isAnswered) {
    return <td></td>
  }
  return <td onClick={() => {props.openQuestion(props.category, props.value);} }>${props.value}</td>
}

