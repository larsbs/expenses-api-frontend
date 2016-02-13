export const SET_USERS_FILTER = 'SET_USERS_FILTER';

export function setUsersFilter(filter) {
  return {
    type: SET_USERS_FILTER,
    payload: {
      filter
    }
  };
}


export const LOAD_USERS = 'LOAD_USERS';

export function loadUsers() {
  return {
    type: LOAD_USERS
  };
}


export const RECEIVE_USERS = 'RECEIVE_USERS';

export function receiveUsers(users) {
  return {
    type: RECEIVE_USERS,
    payload: {
      users
    }
  };
}


export const ADD_USER = 'ADD_USER';

export function addUser(username) {
  return {
    type: ADD_USER,
    payload: {
      user: {
        username
      }
    }
  };
}


export const ADD_USER_SUCCESS = 'ADD_USER_SUCCESS';

export function addUserSuccess() {
  return {
    type: ADD_USER_SUCCESS
  };
}


export const ADD_USER_FAILED = 'ADD_USER_FAILED';

export function addUserFailed() {
  return {
    type: ADD_USER_FAILED
  };
}


export const UPDATE_USER = 'UPDATE_USER';

export function updateUser() {
  return {
    type: UPDATE_USER
  };
}


export const DELETE_USER = 'DELETE_USER';

export function deleteUser() {
  return {
    type: DELETE_USER
  };
}


export const OPEN_ADD_USER_MODAL = 'OPEN_ADD_USER_MODAL';

export function openAddUserModal() {
  return {
    type: OPEN_ADD_USER_MODAL
  };
}


export const CLOSE_ADD_USER_MODAL = 'CLOSE_ADD_USER_MODAL';

export function closeAddUserModal() {
  return {
    type: CLOSE_ADD_USER_MODAL
  };
}
