import React from 'react';

import Header from '../components/Header';
import headerStyles from '../styles/components/header.less';


const breadcrumbs = [{
  icon: 'fa fa-fw fa-credit-card',
  title: 'Expenses'
}];

const Expenses = () => (
  <main>
    <Header breadcrumbs={breadcrumbs}>
      <button className={headerStyles.button}>Add Expense</button>
    </Header>
  </main>
);


export default Expenses;
