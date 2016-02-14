import { fork, call, put, take } from 'redux-saga';

import { fetchAll, createUser, createCategory } from '../utils/api';
import { receiveExpenses } from '../actions/expenses';
import { receiveUsers, ADD_USER, addUserSuccess, addUserFailed } from '../actions/users';
import { receiveCategories, ADD_CATEGORY, addCategorySuccess, addCategoryFailed } from '../actions/categories';
import { showLoading, finishLoading } from '../actions/application';


function* watchAddCategory() {
  while (true) {
    const { payload } = yield take(ADD_CATEGORY);
    try {
      const category = yield call(createCategory, payload.category);
      yield put(addCategorySuccess(payload.category.id, category));
    }
    catch (err) {
      yield put(addCategoryFailed(err, payload.category.id));
    }
  }
}


function* watchAddUser() {
  while (true) {
    const { payload } = yield take(ADD_USER);
    try {
      const user = yield call(createUser, payload.user);
      yield put(addUserSuccess(payload.user.id, user));
    }
    catch (err) {
      yield put(addUserFailed(err, payload.user.id));
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
  yield fork(watchAddCategory);
}
