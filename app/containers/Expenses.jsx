import React from 'react';

import Header from '../components/Header';


const breadcrumbs = [{
  icon: 'fa fa-fw fa-credit-card',
  title: 'Expenses'
}];

const Expenses = () => (
  <Header breadcrumbs={breadcrumbs}>
    <button>Add Expense</button>
  </Header>
);


export default Expenses;
