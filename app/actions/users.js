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

export function addUser() {
  return {
    type: ADD_USER
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
