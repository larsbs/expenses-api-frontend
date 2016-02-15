import { expect } from 'chai';

import reducer from '../../../app/reducers';


describe('@Application', function () {
  it('should return the combined initial state of all the reducers', function () {
    const expectedStateKeys = [
      'routing',
      'application',
      'analytics',
      'categories',
      'expenses',
      'users',
    ];
    const resultStateKeys = Object.keys(reducer(undefined, {}));
    expect(resultStateKeys).to.include(...expectedStateKeys);
  });
});
