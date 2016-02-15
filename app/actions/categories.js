import { createFakeId } from '../utils';


export const SET_CATEGORIES_FILTER = 'SET_CATEGORIES_FILTER';

export function setCategoriesFilter(filter) {
  return {
    type: SET_CATEGORIES_FILTER,
    payload: {
      filter
    }
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

export function addCategory(name, id) {
  if (id && id !== 'testing') throw new Error('Id param must be used only for testing purposes');
  return {
    type: ADD_CATEGORY,
    payload: {
      category: {
        id: id ? id : createFakeId(),
        name,
        loading: true
      }
    }
  };
}


export const ADD_CATEGORY_SUCCESS = 'ADD_CATEGORY_SUCCESS';

export function addCategorySuccess(fakeId, category) {
  return {
    type: ADD_CATEGORY_SUCCESS,
    payload: {
      fakeId,
      category
    }
  };
}


export const ADD_CATEGORY_FAILED = 'ADD_CATEGORY_FAILED';

export function addCategoryFailed(err, fakeId) {
  return {
    type: ADD_CATEGORY_FAILED,
    payload: {
      fakeId,
      err
    }
  };
}


export const OPEN_ADD_CATEGORY_MODAL = 'OPEN_ADD_CATEGORY_MODAL';

export function openAddCategoryModal() {
  return {
    type: OPEN_ADD_CATEGORY_MODAL
  };
}


export const CLOSE_ADD_CATEGORY_MODAL = 'CLOSE_ADD_CATEGORY_MODAL';

export function closeAddCategoryModal() {
  return {
    type: CLOSE_ADD_CATEGORY_MODAL
  };
}
