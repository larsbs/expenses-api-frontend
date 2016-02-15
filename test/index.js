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
    });
  });
});
