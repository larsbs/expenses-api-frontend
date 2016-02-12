import * as UsersActions from '../actions/users';


const initialState = {
  isFetching: false,
  entities: []
};

export default function users(state = initialState, action) {
  switch (action.type) {
      case UsersActions.LOAD_USERS:
        return state;
      case UsersActions.ADD_USER:
        return state;
      case UsersActions.UPDATE_USER:
        return state;
      case UsersActions.DELETE_USER:
        return state;
      default:
        return state;
  }
}
