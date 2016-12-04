import React, { Component } from 'react';
import { connect } from 'react-redux';
import {ipcRenderer} from  'electron';

import Players from './players';
import { loadGameData } from '../actions/actions';


class Setup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: undefined
    };
    this.onStartGame = this.onStartGame.bind(this); 

    ipcRenderer.on('open-file-reply', (event, fileContents) => {
      if(fileContents){
        this.setState({
          data: JSON.parse(fileContents)
        });
      }
    }); 
  }
  
  onLoadGame() {
    ipcRenderer.send('open-file-dialog');
  }

  onStartGame() {
    
    ipcRenderer.send('launch-admin-pannel', {
      players: this.props.players.map(player => {return player.name})
    });
    ipcRenderer.send("launch-scoreboard", {
      players: this.props.players
    });
    
    this.props.loadGameData(this.state.data);
  }

  render() {
    return (
      <div className="setup-screen">
        <h1>JEOPARDY!</h1>
        <Players />
        <div className="menu">
          <button className={this.props.players.length > 1 ? "": "disabled-button"} onClick={this.onLoadGame}>Load Game</button>
          <button className={this.state.data ? "": "disabled-button"}>Create Game</button>
          <button className={this.state.data ? "": "disabled-button"} onClick={() => {console.log(this.props.game)}}>Edit Game</button>
          <button className={this.state.data ? "start-button": "disabled-button"} onClick={this.onStartGame}>Play!</button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {  
    players: state.appReducer.players
  };
}

export default connect(mapStateToProps, { loadGameData })(Setup);
