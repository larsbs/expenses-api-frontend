import * as AnalyticsActions from '../actions/analytics';


const initialState = {
  filter: x => x
};


export default function analytics(state = initialState, action) {
  switch (action.type) {
      case AnalyticsActions.SET_ANALYTICS_FILTER:
        return Object.assign({}, state, {
          filter: action.payload.filter
        });
      default:
        return state;
  }
}
