export const SET_ANALYTICS_FILTER = 'SET_ANALYTICS_FILTER';

export function setAnalyticsFilter(filter) {
  return {
    type: SET_ANALYTICS_FILTER,
    payload: {
      filter
    }
  };
}


export const OPEN_SELECT_DATE_RANGE_MODAL = 'OPEN_SELECT_DATE_RANGE_MODAL';

export function openSelectDateRangeModal() {
  return {
    type: OPEN_SELECT_DATE_RANGE_MODAL
  };
}


export const CLOSE_SELECT_DATE_RANGE_MODAL = 'CLOSE_SELECT_DATE_RANGE_MODAL';

export function closeSelectDateRangeModal() {
  return {
    type: CLOSE_SELECT_DATE_RANGE_MODAL
  };
}


export const CHANGE_DATE_RANGE = 'CHANGE_DATE_RANGE';

export function changeDateRange() {
  return {
    type: CHANGE_DATE_RANGE
  };
}
