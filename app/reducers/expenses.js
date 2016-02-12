import * as ExpensesActions from '../actions/expenses';


const initialState = {
  entities: []
};

export default function expenses(state = initialState, action) {
  switch (action.type) {
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
