import React, { Component } from 'react';
import { connect } from 'react-redux';
import {ipcRenderer} from  'electron';

import Setup from './Setup';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showQuestion: false
    };
    this.openQuestion = this.openQuestion.bind(this);
    this.closeQuestion = this.closeQuestion.bind(this);
  }

  openQuestion(category, value) {

    let question = this.props.game.categories[category].find(question => {
      return question.value === value;
    });
    this.setState({showQuestion: question });

    /* send answer to admin pannel */
    ipcRenderer.send('send-answer-to-admin', question);
 
  }

  closeQuestion() {
    this.setState({showQuestion: false });
  }

  render() {
    let showGame = (Object.keys(this.props.game.categories).length > 0);
    let showQuestion = this.state.showQuestion;
    return (
      <div className="game-container">
        {!showGame && !showQuestion && <Setup />}
        {showGame && !showQuestion &&
        <table>
          <thead>
            <Categories data={this.props.game.categories} />
          </thead>
          <RowContainer categories={this.props.game.categories} openQuestion={this.openQuestion} />
        </table>
        }
        { showQuestion && <Question question={this.state.showQuestion} closeQuestion={this.closeQuestion} />}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    game: state.appReducer.game
  };
}

export default connect(mapStateToProps, { })(App);


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




class Categories extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let categories = Object.keys(this.props.data).map((category, i) => {
      return (
        <th key={i}>{category}</th>
      );
    });

    return (
      <tr>
        {categories}
      </tr>
    );
  }
}

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


class Question extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="question" onClick={() => {this.props.closeQuestion()} }>{this.props.question.question}</div>
    );
  }
}

