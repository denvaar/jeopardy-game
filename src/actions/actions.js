export const LOAD_GAME_DATA = "LOAD_GAME_DATA";

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
