import { fork, take, call } from 'redux-saga';
import * as UserActions from '../actions/users';


//function* startUp(getState) {
//}

//export default function* root(getState) {
  //yield fork(startUp, getState);
//}

export default function* root(getState) {
  yield take(UserActions.ADD_USER);
  yield call(() => new Promise(resolve => resolve(console.log('Hello'))));
}
