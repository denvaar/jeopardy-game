import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './../../reducers/reducers';

export default function configureStore() {
  const composeEnhancers = compose;
  const middleware = [thunk];
  return createStore(rootReducer, composeEnhancers(applyMiddleware(...middleware)));
}
