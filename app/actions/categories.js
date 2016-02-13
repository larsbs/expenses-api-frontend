export const SET_CATEGORIES_FILTER = 'SET_CATEGORIES_FILTER';

export function setCategoriesFilter(filter) {
  return {
    type: SET_CATEGORIES_FILTER,
    payload: {
      filter
    }
  };
}


export const LOAD_CATEGORIES = 'LOAD_CATEGORIES';

export function loadCategories() {
  return {
    type: LOAD_CATEGORIES
  };
}


export const RECEIVE_CATEGORIES = 'RECEIVE_CATEGORIES';

export function receiveCategories(categories) {
  return {
    type: RECEIVE_CATEGORIES,
    payload: {
      categories
    }
  };
}


export const ADD_CATEGORY = 'ADD_CATEGORY';

export function addCategory() {
  return {
    type: ADD_CATEGORY
  };
}


export const UPDATE_CATEGORY = 'UPDATE_CATEGORY';

export function updateCategory() {
  return {
    type: UPDATE_CATEGORY
  };
}


export const DELETE_CATEGORY = 'DELETE_CATEGORY';

export function deleteCategory() {
  return {
    type: DELETE_CATEGORY
  };
}
