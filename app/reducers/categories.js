import * as CategoriesActions from '../actions/categories';


const initialState = {
  isFetching: false,
  categories: []
};

export default function categories(state = initialState, action) {
  switch (action.type) {
      case CategoriesActions.LOAD_CATEGORIES:
        return state;
      case CategoriesActions.ADD_CATEGORY:
        return state;
      case CategoriesActions.UPDATE_CATEGORY:
        return state;
      case CategoriesActions.DELETE_CATEGORY:
        return state;
      default:
        return state;
  }
}
