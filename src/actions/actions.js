export const LOAD_GAME_DATA = "LOAD_GAME_DATA";
export const ADD_PLAYER = "ADD_PLAYER";

export const loadGameData = (data) => {
  return dispatch => {
    return dispatch(_loadGameData(data));
  }
}

const _loadGameData = (data) => {
  return {
    type: LOAD_GAME_DATA,
    data: data
  }
}

export const addPlayer = (player) => {
  return dispatch => {
    return dispatch(_addPlayer(player));
  }
}

const _addPlayer = (player) => {
  return {
    type: ADD_PLAYER,
    player: player,
    score: 0
  }
}

