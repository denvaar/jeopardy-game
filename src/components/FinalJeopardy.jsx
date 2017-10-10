import React, { Component } from 'react';
import { connect } from 'react-redux';
import {ipcRenderer} from  'electron';

import { setPlayerWager, updateFinalScore } from '../actions/actions';


class FinalJeopardy extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showCategory: false,
      totalWagers: 0
    };

    this.setFinalAnswer = this.setFinalAnswer.bind(this);

    ipcRenderer.on('update-final-score', this.setFinalAnswer);
  }

  componentWillUnmount() {
    ipcRenderer.removeAllListeners(['update-final-score']);
  }

  setFinalAnswer(event, args) {
    this.props.updateFinalScore({...args});
    ipcRenderer.send("update-scoreboard", this.props.players);
  }

  render() {
    let players = this.props.players.map(player => {
      return (
        <div key={player.name} className={player.score > 0 ? "wager-box" : "wager-box players-disabled"}>
          <div>{player.name}</div>
          <input type="text"
                 ref={`${player.name}_wager`}
                 placeholder={"Up to $"+player.score} />
          <div>
            <button onClick={(event) => {
              let wager = parseInt(this.refs[`${player.name}_wager`].value);
              if (wager > player.score || wager === Number.NaN) {
                alert(`${player.name} cannot wager more than ${player.score}.`)
              } else {
                this.setState({totalWagers: this.state.totalWagers + 1});
                event.target.classList.add('players-disabled');
                this.refs[`${player.name}_wager`].classList.add('players-disabled');
                this.props.setPlayerWager(wager, player.name);
              }
            }}>
              Wager
            </button>
          </div>
        </div>
      );
    });
    return (
      <div className="game-container final-jeopardy" style={{textAlign: "center"}}>
        {!this.state.showCategory && !this.state.showQuestion &&
        <div className="setup-screen">
          <h1>Final Jeopardy</h1>
          <button onClick={() => {this.setState({showCategory: true})}}>Show Category</button>
        </div>
        }
        {this.state.showCategory && !this.state.showQuestion &&
        <div>
          <p>{this.props.game.finalJeopardy.category}</p>
          {players}
          <button className={this.state.totalWagers == this.props.players.filter(p => p.score > 0).length ? "" : "players-disabled"}
            onClick={() => {
              this.setState({showQuestion: true});
              ipcRenderer.send('show-final-jeopardy-question', {
                question: this.props.game.finalJeopardy.question,
                answer: this.props.game.finalJeopardy.answer,
                wagers: this.props.players.map(player => {return {player: player.name, wager: player.wager}})
              });
          }}>Show Question</button>
        </div>
        }
        {this.state.showQuestion && <div className="question">{this.props.game.finalJeopardy.question}</div>}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    game: state.appReducer.game,
    players: state.appReducer.players,
  };
}

export default connect(mapStateToProps, {setPlayerWager, updateFinalScore})(FinalJeopardy);
