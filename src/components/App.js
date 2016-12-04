import React, { Component } from 'react';
import { connect } from 'react-redux';
import {ipcRenderer} from  'electron';

import Setup from './Setup';
import Row from './Row';
import Question from './Question';
import Categories from '../containers/Categories';
import RowContainer from '../containers/RowContainer';

import { updateScore } from '../actions/actions';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showQuestion: false
    };
    this.openQuestion = this.openQuestion.bind(this);
    this.closeQuestion = this.closeQuestion.bind(this);
  
    ipcRenderer.on('update-score', (event, data) => {
      this.props.updateScore(data.value, data.player);
      ipcRenderer.send("update-scoreboard", this.props.players);
      if (data.value > 0) {
        this.setState({showQuestion: false});
      }
    });
  
  }

  openQuestion(category, value) {

    let question = this.props.game.categories[category].find(question => {
      return question.value === value;
    });
    this.setState({showQuestion: question });

    /* send answer to admin pannel */
    ipcRenderer.send('send-answer-to-admin', {...question, lastCorrectPlayer: this.props.lastCorrectPlayer});
 
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
    game: state.appReducer.game,
    players: state.appReducer.players,
    lastCorrectPlayer: state.appReducer.lastCorrectPlayer
  };
}

export default connect(mapStateToProps, { updateScore })(App);

