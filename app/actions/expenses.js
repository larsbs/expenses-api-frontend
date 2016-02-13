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

export function addExpense() {
  return {
    type: ADD_EXPENSE
  };
}


export const UPDATE_EXPENSE = 'UPDATE_EXPENSE';

export function updateExpense() {
  return {
    type: UPDATE_EXPENSE
  };
}


export const DELETE_EXPENSE = 'DELETE_EXPENSE';

export function deleteExpense() {
  return {
    type: DELETE_EXPENSE
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
