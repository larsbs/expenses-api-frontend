import { combineReducers } from 'redux';
import { routeReducer } from 'react-router-redux';

import application from './application';
import expenses from './expenses';
import users from './users';
import categories from './categories';


export default combineReducers({
  routing: routeReducer,
  application,
  expenses,
  users,
  categories,
});
