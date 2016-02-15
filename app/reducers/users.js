import * as UsersActions from '../actions/users';
import { reverseArray } from '../utils';


const initialState = {
  entities: [],
  filter: x => x,
  isModalOpen: false
};

export default function users(state = initialState, action) {
  switch (action.type) {
      case UsersActions.SET_USERS_FILTER:
        return Object.assign({}, state, {
          filter: action.payload.filter
        });
      case UsersActions.RECEIVE_USERS:
        return Object.assign({}, state, {
          entities: reverseArray(action.payload.users)
        });
      case UsersActions.ADD_USER:
        return Object.assign({}, state, {
          entities: [
            action.payload.user,
            ...state.entities
          ]
        });
      case UsersActions.ADD_USER_SUCCESS:
        // TODO: Add an alert
        return Object.assign({}, state, {
          entities: state.entities.map(e => {
            if (e.loading && e.id === action.payload.fakeId) {
              return action.payload.user;
            }
            return e;
          })
        });
      case UsersActions.ADD_USER_FAILED:
        // TODO: Add an alert
        return Object.assign({}, state, {
          entities: state.entities.filter(e => {
            return ! e.loading && e.id !== action.payload.fakeId;
          })
        });
      case UsersActions.UPDATE_USER:
        return state;
      case UsersActions.DELETE_USER:
        return state;
      case UsersActions.OPEN_ADD_USER_MODAL:
        return Object.assign({}, state, {
          isModalOpen: true
        });
      case UsersActions.CLOSE_ADD_USER_MODAL:
        return Object.assign({}, state, {
          isModalOpen: false
        });
      default:
        return Object.assign({}, state);
  }
}
