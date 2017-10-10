import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ipcRenderer } from  'electron';
import { hashHistory } from 'react-router';

import Setup from './Setup';
import Row from './Row';
import Question from './Question';
import Categories from '../containers/Categories';
import RowContainer from '../containers/RowContainer';

import { updateScore, setCurrentVersion } from '../actions/actions';


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
      ipcRenderer.send("update-scoreboard", this.props.players);

      let done = true;
      for (let i = 0; i < 6; i++) {
        this.props.game[this.props.currentVersion].categories[i].forEach(obj => {
          if (!obj.isAnswered) done = false;
        });
      }

      if (done && data.value >= 0) {
        let dict = ({
          jeopardy: 0,
          doubleJeopardy: 1,
          finalJeopardy: 2
        });
        let nextVersion = dict[this.props.currentVersion] + 1
        this.props.setCurrentVersion(Object.keys(dict)[nextVersion]);
        if (Object.keys(dict)[nextVersion] === "finalJeopardy") {
          hashHistory.push("/play/finalJeopardy");
        }
      } else {
        if (data.value >= 0) {
          this.setState({showQuestion: false});
        }
      }
    });

  }

  openQuestion(category, value) {

    let question = this.props.game[this.props.currentVersion].categories[category].find(question => {
      return question.value === value;
    });
    this.setState({showQuestion: question, category: category });

    /* send answer to admin pannel */
    ipcRenderer.send('send-answer-to-admin', {...question, lastCorrectPlayer: this.props.lastCorrectPlayer});

  }


  render() {
    if (this.props.currentVersion === "finalJeopardy") return <div></div>;
    let showGame = (Object.keys(this.props.game[this.props.currentVersion].categories).length > 0);
    let showQuestion = this.state.showQuestion;
    return (
      <div className="game-container">
        {showGame && !showQuestion &&
        <table>
          <thead>
            <Categories data={
              (() => {
                return Object.keys(this.props.game[this.props.currentVersion].categories).map(catId => {
                  return this.props.game[this.props.currentVersion].categories[catId][0].category;
                });
              })()} />
          </thead>
          <RowContainer currentVersion={this.props.currentVersion}
                        categories={this.props.game[this.props.currentVersion].categories}
                        openQuestion={this.openQuestion} />
        </table>
        }
        { showQuestion && <Question question={this.state.showQuestion} closeQuestion={this.closeQuestion} />}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    game: state.appReducer.game,
    players: state.appReducer.players,
    lastCorrectPlayer: state.appReducer.lastCorrectPlayer,
    currentVersion: state.appReducer.currentVersion
  };
}

export default connect(mapStateToProps, { updateScore, setCurrentVersion })(App);
