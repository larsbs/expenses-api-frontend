import React from 'react';
import { connect } from 'react-redux';

import { getExpensesInRange } from '../utils';
import { populateBelongsTo } from '../utils/populate';
import { calcExpensesEvolution, calcExpensesByCategory } from '../utils/charts';

import Header from '../components/Header';
import LatestActivity from '../components/LatestActivity';
import Chart from '../components/Chart';
import DataFilter from '../components/DataFilter';
import DataTable from '../components/DataTable';

import styles from '../styles/containers/analytics.less';
import headerStyles from '../styles/components/header.less';


const breadcrumbs = [{
  icon: 'fa fa-fw fa-bar-chart',
  title: 'Analytics'
}];

const Analytics = ({ expenses, expensesEvolution, expensesByCategory }) => (
  <main>
    <Header breadcrumbs={breadcrumbs}>
      <button className={headerStyles.button}><i className="fa fa-fw fa-calendar"/> Select Date Range</button>
    </Header>
    <div className={styles.analyticsContent}>
      <div className={styles.container}>
        <div className={styles.analytics}>
          <div className={styles.dateRange}>
            <i className="fa fa-fw fa-calendar" /> Jan 2016 - Feb 2016
          </div>
          <div className={styles.chartsContainer}>
            <Chart title="expenses evolution" data={expensesEvolution} />
            <Chart title="expenses by category" data={expensesByCategory} />
          </div>
        </div>
        <LatestActivity expenses={expenses} />
        <div className={styles.title}>
          <i className="fa fa-fw fa-credit-card" /> Latest expenses
        </div>
        <DataFilter />
        <DataTable />
      </div>
    </div>
  </main>
);

const mapStateToProps = state => {
  const expenses = getExpensesInRange(state.expenses.entities);
  const users = state.users.entities;
  const categories = state.categories.entities;

  return {
    expenses: expenses.map(e => {
      e = populateBelongsTo('user', e, users, 'user_id');
      e = populateBelongsTo('category', e, categories, 'category_id');
      return e;
    }),
    expensesEvolution: calcExpensesEvolution(expenses),
    expensesByCategory: calcExpensesByCategory(expenses)
  };
};


export default connect(mapStateToProps)(Analytics);
