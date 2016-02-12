import { fork, take, call, put } from 'redux-saga';

import { fetchUsers } from '../utils/fetch';
import * as UserActions from '../actions/users';
import { receiveUsers } from '../actions/users';


//function* startUp(getState) {
//}

//export default function* root(getState) {
  //yield fork(startUp, getState);
//}

export default function* root(getState) {
  yield take(UserActions.LOAD_USERS);
  const users = yield call(fetchUsers);
  yield put(receiveUsers(users));
}
