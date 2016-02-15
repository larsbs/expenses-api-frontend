import 'babel-polyfill';
import { expect } from 'chai';
import { put, call, take, fork } from 'redux-saga';

import * as ApplicationActions from '../../../app/actions/application';
import * as UsersActions from '../../../app/actions/users';
import * as CategoriesActions from '../../../app/actions/categories';
import * as ExpensesActions from '../../../app/actions/expenses';
import {
  fetchAll,
  createUser,
  createCategory,
  createExpense
} from '../../../app/utils/api';
import {
  watchAddExpense,
  watchAddCategory,
  watchAddUser,
  loadApp,
} from '../../../app/sagas';
import root from '../../../app/sagas';


describe('@Index', function () {
  describe('#watchAddExpense()', function () {
    const watchAddExpenseGenerator = watchAddExpense();
    it('should react to ADD_EXPENSE action', function () {
      const expected = take(ExpensesActions.ADD_EXPENSE);
      const result = watchAddExpenseGenerator.next().value;
      expect(result).to.deep.equal(expected);
    });
    it('should yield a call to api.createExpense()', function () {
      const payload = { expense: { id: 1 } };
      const expected = call(createExpense, payload.expense);
      const result = watchAddExpenseGenerator.next({ payload }).value;
      expect(result).to.deep.equal(expected);
    });
    it('should yield action ADD_EXPENSE_SUCCESS', function () {
      const expense = { id: 1 };
      const expected = put(ExpensesActions.addExpenseSuccess(1, expense));
      const result = watchAddExpenseGenerator.next(expense).value;
      expect(result).to.deep.equal(expected);
    });
  });
  describe('#watchAddCategory()', function () {
    const watchAddCategoryGenerator = watchAddCategory();
    it('should react to ADD_CATEGORY action', function () {
      const expected = take(CategoriesActions.ADD_CATEGORY);
      const result = watchAddCategoryGenerator.next().value;
      expect(result).to.deep.equal(expected);
    });
    it('should yield a call to api.createCategory()', function () {
      const payload = { category: { id: 1 } };
      const expected = call(createCategory, payload.category);
      const result = watchAddCategoryGenerator.next({ payload }).value;
      expect(result).to.deep.equal(expected);
    });
    it('should yield action ADD_CATEGORY_SUCCESS', function () {
      const category = { id: 1 };
      const expected = put(CategoriesActions.addCategorySuccess(1, category));
      const result = watchAddCategoryGenerator.next(category).value;
      expect(result).to.deep.equal(expected);
    });
  });
  describe('#watchAddUser()', function () {
    const watchAddUserGenerator = watchAddUser();
    it('should react to ADD_USER action', function () {
      const expected = take(UsersActions.ADD_USER);
      const result = watchAddUserGenerator.next().value;
      expect(result).to.deep.equal(expected);
    });
    it('should yield a call to api.createUser()', function () {
      const payload = { user: { id: 1 } };
      const expected = call(createUser, payload.user);
      const result = watchAddUserGenerator.next({ payload }).value;
      expect(result).to.deep.equal(expected);
    });
    it('should yield action ADD_USER_SUCCESS', function () {
      const user = { id: 1 };
      const expected = put(UsersActions.addUserSuccess(1, user));
      const result = watchAddUserGenerator.next(user).value;
      expect(result).to.deep.equal(expected);
    });
  });
  describe('#loadApp()', function () {
    const users = [{ id: 1 }, { id: 2 }, { id: 3 }];
    const expenses = [{ id: 1 }, { id: 2 }, { id: 3 }];
    const categories = [{ id: 1 }, { id: 2 }, { id: 3 }];
    const loadAppGenerator = loadApp();

    it('should start yielding SHOW_LOADING action', function () {
      const expected = put(ApplicationActions.showLoading());
      const result = loadAppGenerator.next().value;
      expect(result).to.deep.equal(expected);
    });
    it('should yield a call to api.fetchAll()', function () {
      const expected = call(fetchAll);
      const result = loadAppGenerator.next().value;
      expect(result).to.deep.equal(expected);
    });
    it('should yield action RECEIVE_USERS', function () {
      const expected = put(UsersActions.receiveUsers(users));
      const result = loadAppGenerator.next({ users, expenses, categories}).value;
      expect(result).to.deep.equal(expected);
    });
    it('should yield action RECEIVE_EXPENSES', function () {
      const expected = put(ExpensesActions.receiveExpenses(expenses));
      const result = loadAppGenerator.next().value;
      expect(result).to.deep.equal(expected);
    });
    it('should yield action RECEIVE_CATEGORIES', function () {
      const expected = put(CategoriesActions.receiveCategories(categories));
      const result = loadAppGenerator.next().value;
      expect(result).to.deep.equal(expected);
    });
    it('should finish yielding FINISH_LOADING action', function () {
      const expected = put(ApplicationActions.finishLoading());
      const result = loadAppGenerator.next().value;
      expect(result).to.deep.equal(expected);
    });
  });
  describe('#root()', function () {
    const rootGenerator = root();
    it('should fork loadApp() generator', function () {
      const expected = fork(loadApp);
      const result = rootGenerator.next().value;
      expect(result).to.deep.equal(expected);
    });
    it('should fork watchAddUser() generator', function () {
      const expected = fork(watchAddUser);
      const result = rootGenerator.next().value;
      expect(result).to.deep.equal(expected);
    });
    it('should fork watchAddCategory() generator', function () {
      const expected = fork(watchAddCategory);
      const result = rootGenerator.next().value;
      expect(result).to.deep.equal(expected);
    });
    it('should fork watchAddExpense() generator', function () {
      const expected = fork(watchAddExpense);
      const result = rootGenerator.next().value;
      expect(result).to.deep.equal(expected);
    });
  });
});
