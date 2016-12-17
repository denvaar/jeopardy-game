import React, { Component } from 'react';
import { connect } from 'react-redux';
import {ipcRenderer} from  'electron';

import { setPlayerWager } from '../actions/actions';


class FinalJeopardy extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showCategory: false
    };
  }

  render() {
    let players = this.props.players.map(player => {
      return (
        <div key={player.name} className="wager-box">
          <div>{player.name}</div>
          <input type="text" ref={`${player.name}_wager`} placeholder={"Up to $"+player.score} />
          <div><button onClick={(event) => {event.target.classList.add('disabled-button'); this.props.setPlayerWager(this.refs[`${player.name}_wager`].value, player.name)}}>Wager</button></div>
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
          <button onClick={() => {
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

const mapStateToProps = (state) => {
  return {
    game: state.appReducer.game,
    players: state.appReducer.players,
  };
}

export default connect(mapStateToProps, {setPlayerWager})(FinalJeopardy);
