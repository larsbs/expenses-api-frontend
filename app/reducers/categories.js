import * as CategoriesActions from '../actions/categories';
import { reverseArray } from '../utils';


const initialState = {
  entities: [],
  filter: x => x,
  isModalOpen: false,
};

export default function categories(state = initialState, action) {
  switch (action.type) {
      case CategoriesActions.SET_CATEGORIES_FILTER:
        return Object.assign({}, state, {
          filter: action.payload.filter
        });
      case CategoriesActions.RECEIVE_CATEGORIES:
        return Object.assign({}, state, {
          entities: reverseArray(action.payload.categories)
        });
      case CategoriesActions.ADD_CATEGORY:
        return Object.assign({}, state, {
          entities: [
            action.payload.category,
            ...state.entities
          ]
        });
      case CategoriesActions.ADD_CATEGORY_SUCCESS:
        return Object.assign({}, state, {
          entities: state.entities.map(e => {
            if (e.loading && e.id === action.payload.fakeId) {
              return action.payload.category;
            }
            return e;
          })
        });
      case CategoriesActions.ADD_CATEGORY_FAILED:
        return Object.assign({}, state, {
          entities: state.entities.filter(e => {
            return ! e.loading && e.id !== action.payload.fakeId;
          })
        });
      case CategoriesActions.OPEN_ADD_CATEGORY_MODAL:
        return Object.assign({}, state, {
          isModalOpen: true
        });
      case CategoriesActions.CLOSE_ADD_CATEGORY_MODAL:
        return Object.assign({}, state, {
          isModalOpen: false
        });
      default:
        return Object.assign({}, state);
  }
}
