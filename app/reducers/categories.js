import * as CategoriesActions from '../actions/categories';


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
          entities: action.payload.categories
        });
      case CategoriesActions.ADD_CATEGORY:
        return state;
      case CategoriesActions.UPDATE_CATEGORY:
        return state;
      case CategoriesActions.DELETE_CATEGORY:
        return state;
      case CategoriesActions.OPEN_ADD_CATEGORY_MODAL:
        return Object.assign({}, state, {
          isModalOpen: true
        });
      case CategoriesActions.CLOSE_ADD_CATEGORY_MODAL:
        return Object.assign({}, state, {
          isModalOpen: false
        });
      default:
        return state;
  }
}
