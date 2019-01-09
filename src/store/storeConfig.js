import {
  createStore,
  compose,
  applyMiddleware
} from 'redux';
import thunk from 'redux-thunk';
import {
  createLogger
} from 'redux-logger';
// import promise from 'redux-promise-middleware';

import initialState from './initialState';
import rootReducer from '../apps/rootReducer';

function jumanjiStore() {

  /* eslint-disable no-underscore-dangle */
  const store = createStore(
    rootReducer,
    initialState,
    compose(applyMiddleware(thunk, createLogger()),
      window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
  );
  /* eslint-enable */

  return store;

}

export default jumanjiStore;