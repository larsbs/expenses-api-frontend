import * as ExpensesActions from '../actions/expenses';


const initialState = {
  isFetching: false,
  expenses: []
};

export default function expenses(state = initialState, action) {
  switch (action.type) {
      case ExpensesActions.LOAD_EXPENSES:
        return state;
      case ExpensesActions.ADD_EXPENSE:
        return state;
      case ExpensesActions.UPDATE_EXPENSE:
        return state;
      case ExpensesActions.DELETE_EXPENSE:
        return state;
      default:
        return state;
  }
}
