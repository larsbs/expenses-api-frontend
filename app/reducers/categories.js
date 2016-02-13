import * as CategoriesActions from '../actions/categories';


const initialState = {
  entities: [],
  filter: x => x
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
      default:
        return state;
  }
}
