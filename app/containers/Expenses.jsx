import React from 'react';

import Header from '../components/Header';
import DataFilter from '../components/DataFilter';
import DataTable from '../components/DataTable';

import styles from '../styles/containers/expenses.less';
import headerStyles from '../styles/components/header.less';


const breadcrumbs = [{
  icon: 'fa fa-fw fa-credit-card',
  title: 'Expenses'
}];

const Expenses = () => (
  <main>
    <Header breadcrumbs={breadcrumbs}>
      <button className={headerStyles.button}><i className="fa fa-fw fa-plus" /> Add Expense</button>
    </Header>
    <div className={styles.container}>
      <DataFilter />
      <DataTable />
    </div>
  </main>
);


export default Expenses;
