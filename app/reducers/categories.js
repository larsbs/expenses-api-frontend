export const LOAD_CATEGORIES = Symbol.for('LOAD_CATEGORIES');

export function loadCategories() {
  return {
    type: LOAD_CATEGORIES
  };
}


export const ADD_CATEGORY = Symbol.for('ADD_CATEGORY');

export function addCategory() {
  return {
    type: ADD_CATEGORY
  };
}


export const UPDATE_CATEGORY = Symbol.for('UPDATE_CATEGORY');

export function updateCategory() {
  return {
    type: UPDATE_CATEGORY
  };
}


export const DELETE_CATEGORY = Symbol.for('DELETE_CATEGORY');

export function deleteCategory() {
  return {
    type: DELETE_CATEGORY
  };
}
