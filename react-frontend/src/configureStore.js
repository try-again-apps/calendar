import { applyMiddleware, compose, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { combineReducers } from 'redux-immutable';
import { routerMiddleware } from 'react-router-redux';

import rootReducer from './reducers';
import { routerReducer } from './reducers/routerReducer';

function devToolsEnhancer() {
  return window.__REDUX_DEVTOOLS_EXTENSION__
    ? window.__REDUX_DEVTOOLS_EXTENSION__()
    : f => f;
}

export default function configureStore(preloadedState, history) {
  const middlewares = [
    thunkMiddleware,
    routerMiddleware(history)
  ];
  const middlewareEnhancer = applyMiddleware(...middlewares);

  const enhancers = [middlewareEnhancer, devToolsEnhancer()];
  const composedEnhancers = compose(...enhancers);

  const reducer = combineReducers({
    app: rootReducer,
    routing: routerReducer
  });

  const store = createStore(reducer, preloadedState, composedEnhancers);

  return store;
}
