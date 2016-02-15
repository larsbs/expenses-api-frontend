import { expect } from 'chai';
import moment from 'moment';

import * as AnalyticsActions from '../../../app/actions/analytics';
import analytics from '../../../app/reducers/analytics';


describe('@Analytics', function () {
  it('should return the initial state when state param is undefined', function () {
    const expectedStateWithoutDateRange = JSON.stringify({
      filter: x => x,
      isModalOpen: false
    });
    const resultState = Object.assign(analytics(undefined, {}));
    const { from, to } = resultState.dateRange;
    delete resultState.dateRange;
    let strResultStateWithoutDateRange = JSON.stringify(resultState);
    expect(strResultStateWithoutDateRange).to.equal(expectedStateWithoutDateRange);
    expect(from).to.satisfy(from => from.isSame(moment().subtract(1, 'month'), 'day'));
    expect(to).to.satisfy(to => to.isSame(moment(), 'day'));
  });
  it('should handle SET_ANALYTICS_FILTER', function () {
    const filter = x => x.map(x => x);
    const from = moment().subtract(1, 'month');
    const to = moment();
    const initialState = {
      filter: x => x,
      isModalOpen: false,
      dateRange: {
        from,
        to
      }
    };
    const expectedState = Object.assign({}, initialState, {
      filter,
    });
    const resultState = analytics(initialState, AnalyticsActions.setAnalyticsFilter(filter));
    expect(resultState).to.deep.equal(expectedState);
  });
  it('should handle OPEN_SELECT_DATE_RANGE_MODAL', function () {
    const initialState = {
      filter: x => x,
      isModalOpen: false,
      dateRange: {
        from: moment().subtract(1, 'month'),
        to: moment()
      }
    };
    const expectedState = Object.assign({}, initialState, {
      isModalOpen: true
    });
    const resultState = analytics(initialState, AnalyticsActions.openSelectDateRangeModal());
    expect(resultState).to.deep.equal(expectedState);
  });
  it('should handle CLOSE_SELECT_DATE_RANGE_MODAL', function () {
    const initialState = {
      filter: x => x,
      isModalOpen: true,
      dateRange: {
        from: moment().subtract(1, 'month'),
        to: moment()
      }
    };
    const expectedState = Object.assign({}, initialState, {
      isModalOpen: false
    });
    const resultState = analytics(initialState, AnalyticsActions.closeSelectDateRangeModal());
    expect(resultState).to.deep.equal(expectedState);
  });
  it('should handle CHANGE_DATE_RANGE', function () {
    const newFrom = moment().subtract(5, 'day');
    const newTo = moment().subtract(1, 'day');
    const initialState = {
      filter: x => x,
      isModalOpen: true,
      dateRange: {
        from: moment().subtract(1, 'month'),
        to: moment()
      }
    };
    const expectedState = Object.assign({}, initialState, {
      dateRange: {
        from: newFrom,
        to: newTo
      }
    });
    const resultState = analytics(initialState, AnalyticsActions.changeDateRange(newFrom, newTo));
    expect(JSON.stringify(resultState)).to.deep.equal(JSON.stringify(expectedState));
  });
});
