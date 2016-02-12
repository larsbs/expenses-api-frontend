import * as ApplicationActions from '../actions/application';


const initialState = {
  isLoading: false
};

export default function application(state = initialState, action) {
  switch (action.type) {
      case ApplicationActions.LOAD_APP:
        return state;
      case ApplicationActions.SHOW_LOADING:
        return Object.assign({}, state, {
          isLoading: true
        });
      case ApplicationActions.FINISH_LOADING:
        return Object.assign({}, state, {
          isLoading: false
        });
      default:
        return state;
  }
}
