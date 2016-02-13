import React from 'react';
import moment from 'moment';
import { connect } from 'react-redux';

import { populateBelongsTo } from '../utils/populate';
import { capitalize, reverseArray } from '../utils';
import { setExpensesFilter } from '../actions/expenses';

import Header from '../components/Header';
import DataFilter from '../components/DataFilter';
import DataTable from '../components/DataTable';

import styles from '../styles/containers/expenses.less';
import headerStyles from '../styles/components/header.less';


const breadcrumbs = [{
  icon: 'fa fa-fw fa-credit-card',
  title: 'Expenses'
}];

const expensesColumns = [
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
  filteredExpenses,
  onChangeFilter
}) => (
  <main>
    <Header breadcrumbs={breadcrumbs}>
      <button className={headerStyles.button}><i className="fa fa-fw fa-plus" /> Add Expense</button>
    </Header>
    <div className={styles.expensesContent}>
      <div className={styles.container}>
        <DataFilter filters={expensesFilters} onChange={onChangeFilter} />
        <DataTable columns={expensesColumns} entries={reverseArray(filteredExpenses)} />
      </div>
    </div>
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
    filteredExpenses
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onChangeFilter: filter => {
      dispatch(setExpensesFilter(filter));
    }
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(Expenses);
