import * as ExpensesActions from '../actions/expenses';


const initialState = {
  entities: [],
  filter: x => x,
  isModalOpen: false,
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
      case ExpensesActions.OPEN_ADD_EXPENSE_MODAL:
        return Object.assign({}, state, {
          isModalOpen: true
        });
      case ExpensesActions.CLOSE_ADD_EXPENSE_MODAL:
        return Object.assign({}, state, {
          isModalOpen: false
        });
      default:
        return state;
  }
}
