import { fork, call, put, take } from 'redux-saga';

import { fetchAll, createUser } from '../utils/api';
import { receiveExpenses } from '../actions/expenses';
import { receiveUsers, ADD_USER, addUserSuccess, addUserFailed } from '../actions/users';
import { receiveCategories } from '../actions/categories';
import { showLoading, finishLoading } from '../actions/application';


function* watchAddUser() {
  while (true) {
    const { payload } = yield take(ADD_USER);
    const { user, err } = yield call(createUser, payload.user);
    if (err) {
      yield put(addUserFailed(err, payload.user));
    }
    else {
      yield put(addUserSuccess(payload.user.fakeId, user));
    }
  }
}


function* loadApp() {
  yield put(showLoading());
  const [ expenses, users, categories ] = yield call(fetchAll);
  yield put(receiveUsers(users));
  yield put(receiveExpenses(expenses));
  yield put(receiveCategories(categories));
  yield put(finishLoading());
}


export default function* root(/* getState */) {
  yield fork(loadApp);
  yield fork(watchAddUser);
}
