import React from 'react';

// Made into a pure function, as class notation was not necessary
export default props => (
  <div className='question'>{props.question.question}</div>
);
