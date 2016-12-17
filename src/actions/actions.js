export const LOAD_GAME_DATA = "LOAD_GAME_DATA";
export const ADD_PLAYER = "ADD_PLAYER";
export const UPDATE_SCORE = "UPDATE_SCORE";
export const UPDATE_LAST_CORRECT_PLAYER = "UPDATE_LAST_CORRECT_PLAYER";
export const UPDATE_QUESTION = "UPDATE_QUESTION";
export const SET_CURRENT_VERSION = "SET_CURRENT_VERSION";
export const SET_WAGER = "SET_WAGER";
export const UPDATE_FINAL_SCORE = "UPDATE_FINAL_SCORE";

export const updateFinalScore = (isCorrect, player) => {
  return dispatch => {
    dispatch(_updateFinalScore(isCorrect, player));
  }
}

const _updateFinalScore = ({isCorrect, player}) => {
  return {
    type: UPDATE_FINAL_SCORE,
    player: player,
    isCorrect: isCorrect
  };
}

export const setPlayerWager = (wager, player) => {
  return dispatch => {
    return dispatch(_setPlayerWager(wager, player));
  }
}

const _setPlayerWager = (wager, player) => {
  return {
    type: SET_WAGER,
    player: player,
    wager: wager
  };
}

export const setCurrentVersion = (version) => {
  return dispatch => {
    return dispatch(_setCurrentVersion(version));
  }
}

const _setCurrentVersion = (version) => {
  return {
    type: SET_CURRENT_VERSION,
    version: version
  };
}

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

export const updateScore = (value, player, categoryIndex, question) => {
  return dispatch => {
    dispatch(_updateScore(value, player));
    if (value > 0) {
      dispatch(_updateLastCorrectPlayer(player));
    }
    dispatch(_updateQuestion(categoryIndex, question));
  }
}

const _updateQuestion = (categoryIndex, question) => {
  return {
    type: UPDATE_QUESTION,
    categoryIndex: categoryIndex,
    question: question
  };
}

const _updateLastCorrectPlayer = (player) => {
  return {
    type: UPDATE_LAST_CORRECT_PLAYER,
    player: player
  };
}

const _updateScore = (value, player) => {
  return {
    type: UPDATE_SCORE,
    player: player,
    value: value
  }
}
