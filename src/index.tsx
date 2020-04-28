import React from 'react';
import ReactDOM from 'react-dom';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import { Provider } from 'react-redux';
import { createStore, compose, applyMiddleware } from 'redux';

import { App } from './containers';
import { reducer } from './redux/reducers';
import { fetchTexts } from './redux/actions';

import * as serviceWorker from './utils/serviceWorker';
import './index.scss';

// const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunkMiddleware)));

// store.dispatch(fetchTexts());

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
