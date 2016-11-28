import { combineReducers } from 'redux';
import {
  LOAD_GAME_DATA,
  ADD_PLAYER
} from '../actions/actions';

const INITIAL_STATE = {
  game: {
    title: "",
    categories: {}
  },
  players: []
};

const appReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ADD_PLAYER:
      return {
        ...state,
        players: [
          ...state.players,
          {
            name: action.player,
            score: action.score
          }
        ]
      };
    case LOAD_GAME_DATA:
      return {
        ...state,
        game: {
          title: "Music",
          categories: {
            ...action.data.categories
          }
        }
      };
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  appReducer
});

export default rootReducer;
