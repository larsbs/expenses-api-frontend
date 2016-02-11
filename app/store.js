import { createStore, applyMiddleware } from 'redux';
import { browserHistory } from 'react-router';
import { syncHistory } from 'react-router-redux';

import reducer from './reducers';


const reduxRouterMiddleware = syncHistory(browserHistory);

export default createStore(
  reducer,
  applyMiddleware(
    reduxRouterMiddleware
  )
);
