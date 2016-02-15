describe('UNIT TESTS', function () {
  describe('ExpensTrack', function () {
    describe('Actions', function () {
      require('./unit/actions/analytics');
      require('./unit/actions/application');
      require('./unit/actions/categories');
      require('./unit/actions/expenses');
      require('./unit/actions/users');
    });
    describe('Reducers', function () {
      require('./unit/reducers/analytics');
      require('./unit/reducers/application');
      require('./unit/reducers/categories');
      require('./unit/reducers/expenses');
      require('./unit/reducers/users');
      require('./unit/reducers/index');
    });
    describe('Utils', function () {
      require('./unit/utils/api');
      require('./unit/utils/charts');
      require('./unit/utils/index');
      require('./unit/utils/populate');
      require('./unit/utils/validate');
    });
    describe('Sagas', function () {
      require('./unit/sagas/index');
    });
  });
});
