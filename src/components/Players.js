import React, { Component } from 'react';
import { connect } from 'react-redux';

import { addPlayer } from '../actions/actions';


class Players extends Component {
  constructor(props) {
    super(props);
    this.handleInput = this.handleInput.bind(this);
  }

  handleInput(event) {
    if (event.keyCode === 13) {
      /* enter key press */
      this.props.addPlayer(event.target.value);
      event.target.value = "";
    }
  }

  render() {
    let players = this.props.players.map((player, index) => {
      return (<p className="player-text" key={index}>{player.name}</p>);
    });
    return (
      <div>
        <h2>Players</h2>
        {players}
        <input type="text" placeholder="Add player..." onKeyUp={this.handleInput}></input>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    players: state.appReducer.players
  };
}

export default connect(mapStateToProps, { addPlayer })(Players);
