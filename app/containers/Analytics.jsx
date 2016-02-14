import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import { getExpensesInRange, reverseArray, capitalize } from '../utils';
import { populateBelongsTo } from '../utils/populate';
import { calcExpensesEvolution, calcExpensesByCategory } from '../utils/charts';
import {
  setAnalyticsFilter,
  openSelectDateRangeModal,
  closeSelectDateRangeModal,
  changeDateRange,
} from '../actions/analytics';

import Header from '../components/Header';
import LatestActivity from '../components/LatestActivity';
import Chart from '../components/Chart';
import DataFilter from '../components/DataFilter';
import DataTable from '../components/DataTable';
import SelectDateRangeModal from '../components/SelectDateRangeModal';

import styles from '../styles/containers/analytics.less';
import headerStyles from '../styles/components/header.less';


const breadcrumbs = [{
  icon: 'fa fa-fw fa-bar-chart',
  title: 'Analytics'
}];

const expensesColumns = [
  { attr: 'created_at', label: 'Date', formatter: value => moment(value).format('DD/MM/YYYY HH:MM A') },
  { attr: 'note', label: 'Note' },
  { attr: 'amount', label: 'Amount', formatter: value => value + '€' },
  { attr: 'user.username', label: 'User' },
  { attr: 'category.name', label: 'Category', formatter: value => capitalize(value) },
];

const expensesFilters = [
  { attr: 'note', label: 'Note', type: 'match' },
  { attr: 'amount', label: 'Amount', type: 'range' },
  { attr: 'user.username', label: 'User', type: 'match' },
  { attr: 'category.name', label: 'Category', type: 'match' },
];

const Analytics = ({
  expenses,
  expensesEvolution,
  expensesByCategory,
  onChangeFilter,
  filteredExpenses,
  dateFrom,
  dateTo,
  isModalOpen,
  onCloseModal,
  onClickSelectDateRange,
  onDateRangeSelected,
}) => (
  <main>
    <Header breadcrumbs={breadcrumbs}>
      <button className={headerStyles.button} onClick={onClickSelectDateRange}>
        <i className="fa fa-fw fa-calendar"/> Select Date Range
      </button>
    </Header>
    <div className={styles.analyticsContent}>
      <div className={styles.container}>
        <div className={styles.analytics}>
          <div className={styles.dateRange}>
            <i className="fa fa-fw fa-calendar" /> {dateFrom.format('MMM DD, YYYY')} - {dateTo.format('MMM DD, YYYY')}
          </div>
          <div className={styles.chartsContainer}>
            <Chart title="expenses evolution" data={expensesEvolution} />
            <Chart title="expenses by category" data={expensesByCategory} />
          </div>
        </div>
        <LatestActivity expenses={expenses} />
        <div className={styles.title}>
          <i className="fa fa-fw fa-credit-card" /> Expenses In Range
        </div>
        <DataFilter filters={expensesFilters} onChange={onChangeFilter} />
        <DataTable columns={expensesColumns} entries={reverseArray(filteredExpenses)} />
      </div>
    </div>
    <SelectDateRangeModal
      initialDateFrom={dateFrom}
      initialDateTo={dateTo}
      isModalOpen={isModalOpen}
      onCloseModal={onCloseModal}
      onDateRangeSelected={onDateRangeSelected} />
  </main>
);


const mapStateToProps = state => {
  const users = state.users.entities;
  const categories = state.categories.entities;
  const expenses = getExpensesInRange(state.expenses.entities).map(e => {
    return Object.assign({}, e, {
      ...populateBelongsTo('user', e, users, 'user_id')
    }, {
      ...populateBelongsTo('category', e, categories, 'category_id')
    });
  });
  const filteredExpenses = state.analytics.filter(expenses);

  return {
    expenses,
    filteredExpenses,
    expensesEvolution: calcExpensesEvolution(expenses),
    expensesByCategory: calcExpensesByCategory(expenses),
    isModalOpen: state.analytics.isModalOpen,
    dateFrom: state.analytics.dateRange.from,
    dateTo: state.analytics.dateRange.to
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onChangeFilter: filter => {
      dispatch(setAnalyticsFilter(filter));
    },
    onClickSelectDateRange: () => {
      dispatch(openSelectDateRangeModal());
    },
    onCloseModal: () => {
      dispatch(closeSelectDateRangeModal());
    },
    onDateRangeSelected: (from, to) => {
      dispatch(changeDateRange(from, to));
    }
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(Analytics);
