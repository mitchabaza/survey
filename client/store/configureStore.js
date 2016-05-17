"use strict"

import {
    createStore,
    applyMiddleware,
    compose
} from 'redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from '../reducers';
const logger = store => next => action => {
  console.log('dispatching', action)
  let result = next(action)
  console.log('next state', store.getState())
  return result
}
export default function configureStore(initialState) {
  const store= createStore(
      rootReducer,
      initialState,
      applyMiddleware(
          thunkMiddleware,logger
      ))

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextReducer = require('../reducers').default
      store.replaceReducer(nextReducer)
    })
  }

  return store
}
