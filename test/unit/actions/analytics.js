'use strict';

import { expect } from 'chai';
import moment from 'moment';

import * as AnalyticsActions from '../../../app/actions/analytics';


describe('@Analytics', function () {
  describe('#setAnalyticsFilter(filter)', function () {
    it('should create an action to change the filter in analytics', function () {
      const filter = x => x;
      const expectedAction = {
        type: AnalyticsActions.SET_ANALYTICS_FILTER,
        payload: {
          filter
        }
      };
      const resultAction = AnalyticsActions.setAnalyticsFilter(filter);
      expect(resultAction).to.deep.equal(expectedAction);
    });
  });
  describe('#openSelectDateRangeModal()', function () {
    it('should create an action to open the select date range modal in analytics', function () {
      const expectedAction = {
        type: AnalyticsActions.OPEN_SELECT_DATE_RANGE_MODAL
      };
      const resultAction = AnalyticsActions.openSelectDateRangeModal();
      expect(resultAction).to.deep.equal(expectedAction);
    });
  });
  describe('#closeSelectDateRangeModal()', function () {
    it('should create an action to close the select date range modal in analytics', function () {
      const expectedAction = {
        type: AnalyticsActions.CLOSE_SELECT_DATE_RANGE_MODAL
      };
      const resultAction = AnalyticsActions.closeSelectDateRangeModal();
      expect(resultAction).to.deep.equal(expectedAction);
    });
  });
  describe('#changeDateRange()', function () {
    it('should create an action to change the date range in analytics', function () {
      const from = moment().subtract(1, 'month');
      const to = moment();
      const expectedAction = {
        type: AnalyticsActions.CHANGE_DATE_RANGE,
        payload: {
          from,
          to
        }
      };
      const resultAction = AnalyticsActions.changeDateRange(from, to);
      expect(resultAction).to.deep.equal(expectedAction);
    });
  });
});
