import React, { Component } from 'react';

import Row from '../components/Row';


class RowContainer extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <tbody>
        <Row value={this.props.currentVersion === "jeopardy" ? 200 : 400} openQuestion={this.props.openQuestion} categories={this.props.categories} />
        <Row value={this.props.currentVersion === "jeopardy" ? 400 : 800} openQuestion={this.props.openQuestion} categories={this.props.categories} />
        <Row value={this.props.currentVersion === "jeopardy" ? 600 : 1200} openQuestion={this.props.openQuestion} categories={this.props.categories} />
        <Row value={this.props.currentVersion === "jeopardy" ? 800 : 1600} openQuestion={this.props.openQuestion} categories={this.props.categories} />
        <Row value={this.props.currentVersion === "jeopardy" ? 1000 : 2000} openQuestion={this.props.openQuestion} categories={this.props.categories} />
      </tbody>
    );  
  }
}

export default RowContainer;
