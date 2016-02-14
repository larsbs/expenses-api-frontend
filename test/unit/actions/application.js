import { expect } from 'chai';

import * as ApplicationActions from '../../../app/actions/application';


describe('@Application', function() {
  describe('#loadApp()', function () {
    it('should create an action to load the entire app data', function () {
      const expectedAction = {
        type: ApplicationActions.LOAD_APP
      };
      const resultAction = ApplicationActions.loadApp();
      expect(resultAction).to.deep.equal(expectedAction);
    });
  });
  describe('#showLoading()', function () {
    it('should create an action to show a loading spinner', function () {
      const expectedAction = {
        type: ApplicationActions.SHOW_LOADING
      };
      const resultAction = ApplicationActions.showLoading();
      expect(resultAction).to.deep.equal(expectedAction);
    });
  });
  describe('#finishLoading()', function () {
    it('should create an action to hide the loading spinner', function () {
      const expectedAction = {
        type: ApplicationActions.FINISH_LOADING
      };
      const resultAction = ApplicationActions.finishLoading();
      expect(resultAction).to.deep.equal(expectedAction);
    });
  });
});
