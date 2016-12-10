import React, { Component } from 'react';
import { connect } from 'react-redux';
import {ipcRenderer} from  'electron';
import { hashHistory } from 'react-router';

import Categories from '../containers/Categories';
import Players from './players';
import { loadGameData } from '../actions/actions';


class Setup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: undefined,
      creatingGame: false
    };
    this.onStartGame = this.onStartGame.bind(this); 
    this.createGame = this.createGame.bind(this);

    ipcRenderer.on('open-file-reply', (event, fileContents) => {
      if(fileContents){
        this.setState({
          data: JSON.parse(fileContents)
        });
      }
    }); 
  }
  
  createGame() {
    this.setState({creatingGame: true });
    hashHistory.push("/edit");
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
    hashHistory.push("/play");
  }

  render() {
    return (
      <div className="setup-screen">
        {this.state.creatingGame &&
          <div>
            <h2>Jeopardy Categories</h2>
            
            <div className="menu">
              <button>Save...</button>
              <button>Double Jeopardy <i className="fa fa-arrow-right"></i></button>
            </div>
          </div>
        }
        {!this.state.creatingGame &&
          <div>
            <h1>JEOPARDY!</h1>
            <Players />
            <div className="menu">
              <button className={this.props.players.length > 1 ? "": "disabled-button"} onClick={this.onLoadGame}>Load Game</button>
              <button onClick={this.createGame}>Create Game</button>
              <button className={this.state.data ? "": "disabled-button"} onClick={() => {console.log(this.props.game)}}>Edit Game</button>
              <button className={this.state.data ? "start-button": "disabled-button"} onClick={this.onStartGame}>Play!</button>
            </div>
          </div>
        }
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
