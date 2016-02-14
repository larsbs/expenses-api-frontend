describe('UNIT TESTS', function () {
  describe('ExpensTrack', function () {
    describe('Actions', function () {
      require('./unit/actions/analytics');
      require('./unit/actions/application');
      require('./unit/actions/categories');
      require('./unit/actions/expenses');
      require('./unit/actions/users');
    });
  });
});
