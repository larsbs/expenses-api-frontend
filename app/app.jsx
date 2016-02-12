import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';

import store from './store';
import routes from './routes';

import DevTools from './containers/DevTools';


import './styles/app.less';


ReactDOM.render(
  <Provider store={store}>
    <div>
      <Router history={browserHistory} routes={routes} />
      <DevTools />
    </div>
  </Provider>,
  document.getElementById('root')
);
