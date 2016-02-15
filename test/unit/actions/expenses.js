import { expect } from 'chai';

import * as ExpensesActions from '../../../app/actions/expenses';


describe('@Expenses', function () {
  describe('#setExpensesFilter(filter)', function () {
    it('should create an action to set the filter in expenses', function () {
      const filter = x => x;
      const expectedAction = {
        type: ExpensesActions.SET_EXPENSES_FILTER,
        payload: {
          filter
        }
      };
      const resultAction = ExpensesActions.setExpensesFilter(filter);
      expect(resultAction).to.deep.equal(expectedAction);
    });
  });
  describe('#receiveExpenses(expenses)', function () {
    it('should create an action to receive the expenses from fetch', function () {
      const expenses = [{
        id: 1,
        note: 'Lorem',
        amount: 232,
        user_id: 1,
        expense_id: 1
      }, {
        id: 2,
        note: 'Ipsum',
        amount: 53,
        user_id: 1,
        expense_id: 1
      }];
      const expectedAction = {
        type: ExpensesActions.RECEIVE_EXPENSES,
        payload: {
          expenses
        }
      };
      const resultAction = ExpensesActions.receiveExpenses(expenses);
      expect(resultAction).to.deep.equal(expectedAction);
    });
  });
  describe('#addExpense(name)', function () {
    it('should create an action to add a expense to the state', function () {
      const note = 'Lorem';
      const amount = 232;
      const category = 1;
      const user = 1;
      const expectedAction = {
        type: ExpensesActions.ADD_EXPENSE,
        payload: {
          expense: {
            note,
            amount,
            category_id: category,
            user_id: user,
            loading: true
          }
        }
      };
      const resultAction = ExpensesActions.addExpense(note, amount, category, user);
      delete resultAction.payload.expense.id;  // NOTE: Impossible to test id, because is random generated
      expect(resultAction).to.deep.equal(expectedAction);
    });
  });
  describe('#addExpenseSuccess(fakeId, expense)', function () {
    it('should create an action to commit a created expense into the state', function () {
      const fakeId = 1231232131;
      const expense = {
        id: 1,
        note: 'Lorem',
        amount: 231,
        user_id: 1,
        category_id: 1
      };
      const expectedAction = {
        type: ExpensesActions.ADD_EXPENSE_SUCCESS,
        payload: {
          fakeId,
          expense
        }
      };
      const resultAction = ExpensesActions.addExpenseSuccess(fakeId, expense);
      expect(resultAction).to.deep.equal(expectedAction);
    });
  });
  describe('#addexpenseFailed(err, fakeId)', function () {
    it('should create an action to revert an ADD_expense action that has failed', function () {
      const err = new Error();
      const fakeId = 12312412342;
      const expectedAction = {
        type: ExpensesActions.ADD_EXPENSE_FAILED,
        payload: {
          fakeId,
          err
        }
      };
      const resultAction = ExpensesActions.addExpenseFailed(err, fakeId);
      expect(resultAction).to.deep.equal(expectedAction);
    });
  });
  describe('#openAddexpenseModal()', function () {
    it('should create an action to show the modal for create a expense', function () {
      const expectedAction = {
        type: ExpensesActions.OPEN_ADD_EXPENSE_MODAL
      };
      const resultAction = ExpensesActions.openAddExpenseModal();
      expect(resultAction).to.deep.equal(expectedAction);
    });
  });
  describe('#closeAddexpenseModal()', function () {
    it('should create an action to close the modal for create a expense', function () {
      const expectedAction = {
        type: ExpensesActions.CLOSE_ADD_EXPENSE_MODAL
      };
      const resultAction = ExpensesActions.closeAddExpenseModal();
      expect(resultAction).to.deep.equal(expectedAction);
    });
  });
});
