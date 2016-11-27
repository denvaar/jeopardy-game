import React, { Component } from 'react';
import { connect } from 'react-redux';
import {ipcRenderer} from  'electron';

import { loadGameData } from '../actions/actions';
import title from '../../img/title.jpg';


class Setup extends Component {
  constructor(props) {
    super(props);
    ipcRenderer.on('open-file-reply', (event, fileContents) => {
      if(fileContents){
        var data = JSON.parse(fileContents);
        this.props.loadGameData(data);
      }
    }); 
  }

  render() {
    return (
      <div className="setup-screen">
        <img className="title-img" src={title} ></img>
        <h1>Players</h1>
        <p>Denver</p>
        <p>Niccole</p>
        <input type="text" placeholder={"Add team..."}></input>
        <div className="menu">
          <div>
            <button onClick={() => {ipcRenderer.send('open-file-dialog');} }>Load Game</button>
          </div>
          <div>
            <button onClick={() => {console.log(this.props.game)}}>Create Game</button>
          </div>
          <div>
            <button onClick={() => {ipcRenderer.send('launch-admin-pannel', {players:['Tom', 'Ringo', 'Denver']});}}>Launch Admin Pannel</button>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {  
  };
}

export default connect(mapStateToProps, { loadGameData })(Setup);
