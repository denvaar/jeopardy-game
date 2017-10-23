import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ipcRenderer } from  'electron';
import { hashHistory } from 'react-router';

import Players from './Players';
import { loadGameData } from '../actions/actions';

class Setup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: undefined,
      gameName: undefined,
      creatingGame: false,
    };

    this.onStartGame = this.onStartGame.bind(this);
    this.createGame = this.createGame.bind(this);
    this.loadFileListener = this.loadFileListener.bind(this);

    ipcRenderer.on('open-file-reply', this.loadFileListener);
  }

  componentWillUnmount() {
    ipcRenderer.removeAllListeners(['open-file-reply']);
  }

  onStartGame() {
    ipcRenderer.send('launch-admin-pannel', {
      players: this.props.players.map(player => {return player.name})
    });
    ipcRenderer.send('launch-scoreboard', {
      players: this.props.players
    });
    this.props.loadGameData(this.state.data);
    hashHistory.push('/play');
  }

  onLoadGame() {
    ipcRenderer.send('open-file-dialog');
  }

  createGame() {
    this.setState({creatingGame: true });
    hashHistory.push('/edit');
  }

  loadFileListener(event, data) {
    if (data.fileContents){
      try {
        this.setState({
          data: JSON.parse(data.fileContents),
          gameName: data.name
        });
      } catch (e) {
        alert('Could not load game file. ' + e);
      }
    }
  }

  render() {
    return (
      <div className='game-container'>
        {!this.state.creatingGame &&
          <div className='setup-screen'>
            <h1>JEOPARDY!</h1>
            <Players />
            <br/>
            <div className='file-info'>Game file: {this.state.gameName || '--'}</div>
            <div className='menu'>
              <button className='load-game' onClick={this.onLoadGame}>Load Game</button>
              <button className='create-game' onClick={this.createGame}>Create/Edit Game</button>
              <button className={this.state.data && this.props.players.length > 1 ? 'start-button': 'disabled-button'}
                      onClick={this.onStartGame}>Play!</button>
            </div>
          </div>
        }
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    players: state.appReducer.players
  };
};

export default connect(mapStateToProps, { loadGameData })(Setup);
