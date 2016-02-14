import moment from 'moment';
import * as AnalyticsActions from '../actions/analytics';


const initialState = {
  filter: x => x,
  isModalOpen: false,
  dateRange: {
    from: moment().subtract(1, 'month'),
    to: moment()
  }
};


export default function analytics(state = initialState, action) {
  switch (action.type) {
      case AnalyticsActions.SET_ANALYTICS_FILTER:
        return Object.assign({}, state, {
          filter: action.payload.filter
        });
      case AnalyticsActions.OPEN_SELECT_DATE_RANGE_MODAL:
        return Object.assign({}, state, {
          isModalOpen: true
        });
      case AnalyticsActions.CLOSE_SELECT_DATE_RANGE_MODAL:
        return Object.assign({}, state, {
          isModalOpen: false
        });
      case AnalyticsActions.CHANGE_DATE_RANGE:
        return Object.assign({}, state, {
        });
      default:
        return state;
  }
}
