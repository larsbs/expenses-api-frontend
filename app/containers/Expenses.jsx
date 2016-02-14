import React from 'react';
import moment from 'moment';
import { connect } from 'react-redux';

import { populateBelongsTo } from '../utils/populate';
import { capitalize, reverseArray } from '../utils';
import {
  setExpensesFilter,
  openAddExpenseModal,
  closeAddExpenseModal,
  addExpense
} from '../actions/expenses';

import Header from '../components/Header';
import DataFilter from '../components/DataFilter';
import DataTable from '../components/DataTable';
import AddExpenseModal from '../components/AddExpenseModal';

import styles from '../styles/containers/expenses.less';
import headerStyles from '../styles/components/header.less';


const breadcrumbs = [{
  icon: 'fa fa-fw fa-credit-card',
  title: 'Expenses'
}];

const expensesColumns = [
  { attr: 'id', label: 'Id', progress: true },
  { attr: 'created_at', label: 'Date', formatter: value => moment(value).format('DD/MM/YYYY HH:MM A') },
  { attr: 'note', label: 'Note' },
  { attr: 'amount', label: 'Amount', formatter: value => value + '€' },
  { attr: 'user.username', label: 'User' },
  { attr: 'category.name', label: 'Category', formatter: value => capitalize(value) },
];

const expensesFilters = [
  { attr: 'created_at', label: 'From', type: 'date-range-start-1' },
  { attr: 'created_at', label: 'To', type: 'date-range-end-2' },
  { attr: 'note', label: 'Note', type: 'match' },
  { attr: 'amount', label: 'Amount', type: 'range' },
  { attr: 'user.username', label: 'User', type: 'match' },
  { attr: 'category.name', label: 'Category', type: 'match' },
];

const Expenses = ({
  users,
  categories,
  filteredExpenses,
  onChangeFilter,
  isModalOpen,
  onClickAddExpense,
  onCloseModal,
  onAddExpense,
}) => (
  <main>
    <Header breadcrumbs={breadcrumbs}>
      <button className={headerStyles.button} onClick={onClickAddExpense}>
        <i className="fa fa-fw fa-plus" /> Add Expense
      </button>
    </Header>
    <div className={styles.expensesContent}>
      <div className={styles.container}>
        <DataFilter filters={expensesFilters} onChange={onChangeFilter} />
        <DataTable columns={expensesColumns} entries={reverseArray(filteredExpenses)} />
      </div>
    </div>
    <AddExpenseModal
      isModalOpen={isModalOpen}
      onCloseModal={onCloseModal}
      onAddExpense={onAddExpense}
      users={users}
      categories={categories} />
  </main>
);

const mapStateToProps = state => {
  const users = state.users.entities;
  const categories = state.categories.entities;
  const expenses = state.expenses.entities.map(e => {
    return Object.assign({}, e, {
      ...populateBelongsTo('user', e, users, 'user_id')
    }, {
      ...populateBelongsTo('category', e, categories, 'category_id')
    });
  });
  const filteredExpenses = state.expenses.filter(expenses);

  return {
    users,
    categories,
    filteredExpenses,
    isModalOpen: state.expenses.isModalOpen
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onChangeFilter: filter => {
      dispatch(setExpensesFilter(filter));
    },
    onClickAddExpense: () => {
      dispatch(openAddExpenseModal());
    },
    onCloseModal: () => {
      dispatch(closeAddExpenseModal());
    },
    onAddExpense: (note, amount, category, user) => {
      dispatch(addExpense(note, amount, category, user));
    }
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(Expenses);
