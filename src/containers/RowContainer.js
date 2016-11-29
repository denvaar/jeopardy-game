import React, { Component } from 'react';

import Row from '../components/Row';


class RowContainer extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <tbody>
        <Row value={200} openQuestion={this.props.openQuestion} categories={this.props.categories} />
        <Row value={400} openQuestion={this.props.openQuestion} categories={this.props.categories} />
        <Row value={600} openQuestion={this.props.openQuestion} categories={this.props.categories} />
        <Row value={800} openQuestion={this.props.openQuestion} categories={this.props.categories} />
        <Row value={1000} openQuestion={this.props.openQuestion} categories={this.props.categories} />
      </tbody>
    );  
  }
}

export default RowContainer;
