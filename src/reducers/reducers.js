import { combineReducers } from 'redux';
import {
  LOAD_GAME_DATA
} from '../actions/actions';

const INITIAL_STATE = {
  "game": {
    "title": "",
    "categories": {}
  }
};

const appReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOAD_GAME_DATA:
      return {
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
