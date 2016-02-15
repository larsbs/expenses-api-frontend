import chai from 'chai';
import spies from 'chai-spies';
chai.use(spies);


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
    describe('Components', function () {
      require('./unit/components/AddCategoryModal');
      require('./unit/components/AddExpenseModal');
      require('./unit/components/AddUserModal');
      require('./unit/components/Breadcrumbs');
      require('./unit/components/Chart');
      require('./unit/components/DataFilter');
      require('./unit/components/DataTable');
      require('./unit/components/Header');
      require('./unit/components/LatestActivity');
      require('./unit/components/Loader');
      require('./unit/components/SelectDateRangeModal');
      require('./unit/components/Sidebar');
      require('./unit/components/Spinner');
    });
  });
});
