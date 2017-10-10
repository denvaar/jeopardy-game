import React, { Component } from 'react';
import { connect } from 'react-redux';
import {ipcRenderer} from  'electron';
import { hashHistory } from 'react-router';

import Setup from './Setup';
import Row from './Row';
import Question from './Question';
import Categories from '../containers/Categories';
import RowContainer from '../containers/RowContainer';

import { updateScore, setCurrentVersion } from '../actions/actions';

// Helper Functions
const getAllQuestions = (categories) => {
  let allQs = [];
  Object.keys(categories).forEach(category => {
    allQs = allQs.concat(categories[category])
  })
  return allQs;
}

const isBoardComplete = (categories) => {
  const allQs = getAllQuestions(categories)
  return !allQs.filter(question => !question.isAnswered).length
}

const getCategories = (categories) => {
  const catObject = {};
  const allQs = getAllQuestions(categories);
  allQs.forEach(question => {
    catObject[question.category] = '';
  });
  return Object.keys(catObject);
};

// Component
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showQuestion: false
    };
    this.openQuestion = this.openQuestion.bind(this);
    /*this.closeQuestion = this.closeQuestion.bind(this);*/
  
    ipcRenderer.on('update-score', (event, data) => {
      this.props.updateScore(data.value, data.player, this.state.category, this.state.showQuestion);
      ipcRenderer.send('update-scoreboard', this.props.players);
      const done = isBoardComplete(this.props.game[this.props.currentVersion].categories);
      
      if (done && data.value >= 0) {
        const dict = ({
          jeopardy: 0,
          doubleJeopardy: 1,
          finalJeopardy: 2
        });
        const nextVersion = dict[this.props.currentVersion] + 1 
        this.props.setCurrentVersion(Object.keys(dict)[nextVersion]);
        if (Object.keys(dict)[nextVersion] === 'finalJeopardy') {
          hashHistory.push('/play/finalJeopardy');
        }
      } else if (data.value >= 0) { 
        this.setState({ showQuestion: false });
      }
    });
  
  }

  openQuestion(category, value) {

    const question = this.props.game[this.props.currentVersion].categories[category].find(question => question.value === value);
    this.setState({ showQuestion: question, category });
    /* send answer to admin pannel */
    ipcRenderer.send('send-answer-to-admin', { ...question, lastCorrectPlayer: this.props.lastCorrectPlayer });
  }


  render() {
    if (this.props.currentVersion === 'finalJeopardy') return <div></div>;
    const showGame = (Object.keys(this.props.game[this.props.currentVersion].categories).length > 0);
    const showQuestion = this.state.showQuestion;
    return (
      <div className="game-container">
        {showGame && !showQuestion &&
        <table>
          <thead>
            <Categories
              categories={getCategories(this.props.game[this.props.currentVersion].categories)}
            />
          </thead>
          <RowContainer
            currentVersion={this.props.currentVersion}
            categories={this.props.game[this.props.currentVersion].categories}
            openQuestion={this.openQuestion}
          />
        </table>
        }
        { showQuestion && <Question question={this.state.showQuestion} closeQuestion={this.closeQuestion} />}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    game: state.appReducer.game,
    players: state.appReducer.players,
    lastCorrectPlayer: state.appReducer.lastCorrectPlayer,
    currentVersion: state.appReducer.currentVersion
  };
}

export default connect(mapStateToProps, { updateScore, setCurrentVersion })(App);

