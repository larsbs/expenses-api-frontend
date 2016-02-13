export const SET_ANALYTICS_FILTER = 'SET_ANALYTICS_FILTER';

export function setAnalyticsFilter(filter) {
  return {
    type: SET_ANALYTICS_FILTER,
    payload: {
      filter
    }
  };
}
