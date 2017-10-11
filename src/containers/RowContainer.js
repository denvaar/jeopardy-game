import React, { Component } from 'react';

import Row from '../components/Row';


export default (props) => {
  const multiplier = props.currentVersion === 'jeopardy' ? 1 : 2;
  return(
    <tbody>
      <Row value={200 * multiplier} openQuestion={props.openQuestion} categories={props.categories} />
      <Row value={400 * multiplier} openQuestion={props.openQuestion} categories={props.categories} />
      <Row value={600 * multiplier} openQuestion={props.openQuestion} categories={props.categories} />
      <Row value={800 * multiplier} openQuestion={props.openQuestion} categories={props.categories} />
      <Row value={1000 * multiplier} openQuestion={props.openQuestion} categories={props.categories} />
    </tbody>
  )
};
