import { fork, take, call, put } from 'redux-saga';

import { fetchUsers } from '../utils/fetch';
import * as UserActions from '../actions/users';
import { receiveUsers } from '../actions/users';
import { showLoading, finishLoading } from '../actions/application';


function* loadApp() {
  yield put(showLoading());
  const users = yield call(fetchUsers);
  yield put(receiveUsers(users));
  yield put(finishLoading());
}

export default function* root(getState) {
  yield fork(loadApp);
}
