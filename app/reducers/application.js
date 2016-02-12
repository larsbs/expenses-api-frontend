import * as ApplicationActions from '../actions/application';


const initialState = {
  isLoading: false
};

export default function application(state = initialState, action) {
  switch (action.type) {
      case ApplicationActions.LOAD_APP:
        return state;
      default:
        return state;
  }
}
