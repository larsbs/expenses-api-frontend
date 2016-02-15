import { createFakeId } from '../utils';


export const SET_EXPENSES_FILTER = 'SET_EXPENSES_FILTER';

export function setExpensesFilter(filter) {
  return {
    type: SET_EXPENSES_FILTER,
    payload: {
      filter
    }
  };
}


export const LOAD_EXPENSES = 'LOAD_EXPENSES';

export function loadExpenses() {
  return {
    type: LOAD_EXPENSES
  };
}


export const RECEIVE_EXPENSES = 'RECEIVE_EXPENSES';

export function receiveExpenses(expenses) {
  return {
    type: RECEIVE_EXPENSES,
    payload: {
      expenses
    }
  };
}


export const ADD_EXPENSE = 'ADD_EXPENSE';

export function addExpense(note, amount, category, user, id) {
  if (id && id !== 'testing') throw new Error('Id param must be used only for testing purposes');
  return {
    type: ADD_EXPENSE,
    payload: {
      expense: {
        id: id ? id : createFakeId(),
        note,
        amount,
        category_id: category,
        user_id: user,
        loading: true
      }
    }
  };
}


export const ADD_EXPENSE_SUCCESS = 'ADD_EXPENSE_SUCCESS';

export function addExpenseSuccess(fakeId, expense) {
  return {
    type: ADD_EXPENSE_SUCCESS,
    payload: {
      fakeId,
      expense
    }
  };
}


export const ADD_EXPENSE_FAILED = 'ADD_EXPENSE_FAILED';

export function addExpenseFailed(err, fakeId) {
  return {
    type: ADD_EXPENSE_FAILED,
    payload: {
      fakeId,
      err
    }
  };
}


export const OPEN_ADD_EXPENSE_MODAL = 'OPEN_ADD_EXPENSE_MODAL';

export function openAddExpenseModal() {
  return {
    type: OPEN_ADD_EXPENSE_MODAL
  };
}


export const CLOSE_ADD_EXPENSE_MODAL = 'CLOSE_ADD_EXPENSE_MODAL';

export function closeAddExpenseModal() {
  return {
    type: CLOSE_ADD_EXPENSE_MODAL
  };
}
