import 'babel-polyfill';
import { createStore, applyMiddleware, compose } from 'redux';
import { browserHistory } from 'react-router';
import { syncHistory } from 'react-router-redux';
import sagaMiddleware from 'redux-saga';

import reducer from './reducers';
import saga from './sagas';


const reduxRouterMiddleware = syncHistory(browserHistory);

export default createStore(
  reducer,
  compose(
    applyMiddleware(
      reduxRouterMiddleware,
      sagaMiddleware(saga)
    ),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )
);
