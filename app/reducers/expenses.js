import * as ExpensesActions from '../actions/expenses';


const initialState = {
  entities: [],
  filter: x => x
};

export default function expenses(state = initialState, action) {
  switch (action.type) {
      case ExpensesActions.SET_EXPENSES_FILTER:
        return Object.assign({}, state, {
          filter: action.payload.filter
        });
      case ExpensesActions.RECEIVE_EXPENSES:
        return Object.assign({}, state, {
          entities: action.payload.expenses
        });
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
