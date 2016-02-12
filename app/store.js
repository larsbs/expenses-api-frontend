import { createStore, applyMiddleware, compose } from 'redux';
import { browserHistory } from 'react-router';
import { syncHistory } from 'react-router-redux';

import reducer from './reducers';
import DevTools from './containers/DevTools';


const reduxRouterMiddleware = syncHistory(browserHistory);

export default createStore(
  reducer,
  compose(
    DevTools.instrument(),
    applyMiddleware(
      reduxRouterMiddleware
    )
  )
);
