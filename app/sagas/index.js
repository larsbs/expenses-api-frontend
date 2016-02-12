import { fork, take, call, put } from 'redux-saga';

import { fetchAll } from '../utils/fetch';
import { receiveExpenses } from '../actions/expenses';
import { receiveUsers } from '../actions/users';
import { receiveCategories } from '../actions/categories';
import { showLoading, finishLoading } from '../actions/application';


function* loadApp() {
  yield put(showLoading());
  const [ expenses, users, categories ] = yield call(fetchAll);
  yield put(receiveUsers(users));
  yield put(receiveExpenses(expenses));
  yield put(receiveCategories(categories));
  yield put(finishLoading());
}

export default function* root(getState) {
  yield fork(loadApp);
}
