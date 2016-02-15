import { expect } from 'chai';

import * as ExpensesActions from '../../../app/actions/expenses';
import expenses from '../../../app/reducers/expenses';


describe('@Expenses', function () {
  it('should return the initial state when state param is undefined', function () {
    const initialState = {
      entities: [],
      filter: x => x,
      isModalOpen: false
    };
    const resultState = expenses(undefined, {});
    expect(JSON.stringify(resultState)).to.equal(JSON.stringify(initialState));
  });
  it('should handle SET_EXPENSES_FILTER', function () {
    const filter = x => x.map(x => x);
    const initialState = {
      entities: [],
      filter: x => x,
      isModalOpen: false
    };
    const expectedState = Object.assign({}, initialState, {
      filter,
    });
    const resultState = expenses(initialState, ExpensesActions.setExpensesFilter(filter));
    expect(resultState).to.deep.equal(expectedState);
  });
  it('should handle ADD_EXPENSE', function () {
    const expense = {
      id: 'testing',
      note: 'Lorem',
      amount: 232,
      user_id: 1,
      category_id: 1,
      loading: true
    };
    const initialState = {
      entities: [],
      filter: x => x,
      isModalOpen: false
    };
    const expectedState = Object.assign({}, initialState, {
      entities: [
        expense,
        ...initialState.entities
      ]
    });
    const resultState = expenses(initialState, ExpensesActions.addExpense(
      expense.note,
      expense.amount,
      expense.user_id,
      expense.category_id,
      expense.id,
    ));
    expect(resultState).to.deep.equal(expectedState);
  });
  it('should handle ADD_EXPENSE_SUCCESS', function () {
    const fakeExpense = {
      id: 'testing',
      note: 'Lorem',
      amount: 232,
      user_id: 1,
      category_id: 1,
      loading: true
    };
    const expense = {
      id: 1,
      note: 'Lorem',
      amount: 232,
      user_id: 1,
      category_id: 1,
      expensename: 'Lorem'
    };
    const initialState = {
      entities: [fakeExpense],
      filter: x => x,
      isModalOpen: false
    };
    const expectedState = Object.assign({}, initialState, {
      entities: initialState.entities.map(e => {
        if (e.loading && e.id === fakeExpense.id) {
          return expense;
        }
        return e;
      })
    });
    const resultState = expenses(initialState, ExpensesActions.addExpenseSuccess('testing', expense));
    expect(resultState).to.deep.equal(expectedState);
  });
  it('should handle ADD_EXPENSE_FAILED', function () {
    const fakeExpense = {
      id: 'testing',
      note: 'Lorem',
      amount: 232,
      user_id: 1,
      category_id: 1,
      loading: true
    };
    const err = new Error();
    const initialState = {
      entities: [fakeExpense],
      filter: x => x,
      isModalOpen: false
    };
    const expectedState = Object.assign({}, initialState, {
      entities: initialState.entities.filter(e => {
        return ! e.loading && e.id !== fakeExpense.id;
      })
    });
    const resultState = expenses(initialState, ExpensesActions.addExpenseFailed(err, 'testing'));
    expect(resultState).to.deep.equal(expectedState);
  });
  it('should handle OPEN_ADD_EXPENSE_MODAL', function () {
    const initialState = {
      entities: [],
      filter: x => x,
      isModalOpen: false,
    };
    const expectedState = Object.assign({}, initialState, {
      isModalOpen: true
    });
    const resultState = expenses(initialState, ExpensesActions.openAddExpenseModal());
    expect(resultState).to.deep.equal(expectedState);
  });
  it('should handle CLOSE_ADD_EXPENSE_MODAL', function () {
    const initialState = {
      entities: [],
      filter: x => x,
      isModalOpen: true,
    };
    const expectedState = Object.assign({}, initialState, {
      isModalOpen: false
    });
    const resultState = expenses(initialState, ExpensesActions.closeAddExpenseModal());
    expect(resultState).to.deep.equal(expectedState);
  });
});
