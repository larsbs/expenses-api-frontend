export const LOAD_USERS = Symbol.for('LOAD_USERS');

export function loadUsers() {
  return {
    type: LOAD_USERS
  };
}


export const ADD_USER = Symbol.for('ADD_USER');

export function addUser() {
  return {
    type: ADD_USER
  };
}


export const UPDATE_USER = Symbol.for('UPDATE_USER');

export function updateUser() {
  return {
    type: UPDATE_USER
  };
}


export const DELETE_USER = Symbol.for('DELETE_USER');

export function deleteUser() {
  return {
    type: DELETE_USER
  };
}
