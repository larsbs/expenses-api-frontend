export const LOAD_EXPENSES = 'LOAD_EXPENSES';

export function loadExpenses() {
  return {
    type: LOAD_EXPENSES
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
