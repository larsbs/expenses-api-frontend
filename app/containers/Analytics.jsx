import React from 'react';

import Header from '../components/Header';
import LatestActivity from '../components/LatestActivity';
import Chart from '../components/Chart';
import styles from '../styles/containers/analytics.less';


const breadcrumbs = [{
  icon: 'fa fa-fw fa-bar-chart',
  title: 'Analytics'
}];

const expensesEvolution = {
  title: {
    text: ''
  },
  xAxis: {
    type: 'datetime'
  },
  yAxis: {
    title: {
      text: 'Amount'
    }
  },
  series: [{
    type: 'line',
    name: 'Expenses evolution',
    data: [
      [Date.UTC(2016, 1, 1), 232.30],
      [Date.UTC(2016, 1, 2), 55.90],
      [Date.UTC(2016, 1, 3), 132.30],
      [Date.UTC(2016, 1, 4), 322.13],
      [Date.UTC(2016, 1, 5), 102.51],
      [Date.UTC(2016, 1, 6), 232.75],
      [Date.UTC(2016, 1, 7), 432.12],
    ]
  }]
};

const expensesByCategory = {
  chart: {
    type: 'pie'
  },
  title: {
    text: ''
  },
  legend: {
    layout: 'vertical',
    align: 'right',
    verticalAlign: 'middle',
    itemMarginBottom: 10,
    padding: 50
  },
  plotOptions: {
    pie: {
      allowPointSelect: true,
      cursor: 'pointer',
      dataLabels: {
        enabled: false
      },
      showInLegend: true
    }
  },
  series: [{
    name: 'Brands',
    colorByPoint: true,
    data: [{
      name: 'Microsoft Internet Explorer',
      y: 56.33
    }, {
      name: 'Chrome',
      y: 24.03,
      sliced: true,
      selected: true
    }, {
      name: 'Firefox',
      y: 10.38
    }, {
      name: 'Safari',
      y: 4.77
    }, {
      name: 'Opera',
      y: 0.91
    }, {
      name: 'Proprietary or Undetectable',
      y: 0.2
    }]
  }]
};

const Analytics = () => (
  <main>
    <Header breadcrumbs={breadcrumbs}>
      <button>Add Life</button>
    </Header>
    <div className={styles.analyticsContent}>
      <div className={styles.analytics}>
        <div className={styles.dateRange}>
          <i className="fa fa-fw fa-calendar" /> Jan 2016 - Feb 2016
        </div>
        <div className={styles.chartsContainer}>
          <Chart title="expenses evolution" data={expensesEvolution} />
          <Chart title="expenses by category" data={expensesByCategory} />
        </div>
      </div>
      <LatestActivity />
    </div>
  </main>
);


export default Analytics;
