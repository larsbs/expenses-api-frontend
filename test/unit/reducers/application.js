import { expect } from 'chai';

import * as ApplicationActions from '../../../app/actions/application';
import application from '../../../app/reducers/application';


describe('@Application', function () {
  it('should return the initial state when state param is undefined', function () {
    const initialState = {
      isLoading: false
    };
    const resultState = application(undefined, {});
    expect(resultState).to.deep.equal(initialState);
  });
  it('should handle SHOW_LOADING', function () {
    const initialState = {
      isLoading: false
    };
    const expectedState = Object.assign({}, initialState, {
      isLoading: true
    });
    const resultState = application(initialState, ApplicationActions.showLoading());
    expect(resultState).to.deep.equal(expectedState);
  });
  it('should handle FINISH_LOADING', function () {
    const initialState = {
      isLoading: true
    };
    const expectedState = Object.assign({}, initialState, {
      isLoading: false
    });
    const resultState = application(initialState, ApplicationActions.finishLoading());
    expect(resultState).to.deep.equal(expectedState);
  });
});
