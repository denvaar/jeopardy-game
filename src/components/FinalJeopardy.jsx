import React, { Component } from 'react';
import { connect } from 'react-redux';


class FinalJeopardy extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="setup-screen">
        <h1>Final Jeopardy</h1>
        <button>Show Category</button>
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

export default connect(mapStateToProps, {})(FinalJeopardy);
