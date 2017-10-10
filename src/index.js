import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { Router, Route, hashHistory } from 'react-router';

import reducers from './reducers/reducers';
import App from './components/App';
import FinalJeopardy from './components/FinalJeopardy';
import Setup from './components/Setup';
import Edit from './components/Edit';
import '../styles/styles.css';


const createStoreWithMiddleware = compose(
  applyMiddleware(thunkMiddleware),
  window.devToolsExtension ? window.devToolsExtension() : f => f
)(createStore);


ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <Router history={hashHistory}>
      <Route path='/' component={Setup} />
      <Route path='/play' component={App} />
      <Route path='/play/finalJeopardy' component={FinalJeopardy} />
      <Route path='/edit' component={Edit} />
    </Router>
  </Provider>,
  document.getElementById('app')
);

if (module.hot) module.hot.accept();
