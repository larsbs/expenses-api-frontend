import * as UsersActions from '../actions/users';


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
          entities: action.payload.users
        });
      case UsersActions.ADD_USER:
        return Object.assign({}, state, {
          entities: [
            ...state.entities,
            action.payload.user
          ]
        });
      case UsersActions.ADD_USER_SUCCESS:
        // TODO: Add alert
        const newState = state.entities.map(e => {
          if (e.loading && e.id === action.payload.fakeId) {
            return action.payload.user;
          }
          return e;
        });

        return Object.assign({}, state, {
          entities: state.entities.map(e => {
            if (e.loading && e.id === action.payload.fakeId) {
              return action.payload.user;
            }
            return e;
          })
        });
      case UsersActions.ADD_USER_FAILED:
        console.log(action.payload.err);  // TODO: Replace by an alert
        console.log('ADD_USER OPERATION FAILED');
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
        return state;
  }
}
