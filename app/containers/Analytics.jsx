import React from 'react';

import Header from '../components/Header';
import LatestActivity from '../components/LatestActivity';
import Chart from '../components/Chart';
import styles from '../styles/containers/analytics.less';


const breadcrumbs = [{
  icon: 'fa fa-fw fa-bar-chart',
  title: 'Analytics'
}];

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
          <Chart type="lines" />
        </div>
      </div>
      <LatestActivity />
    </div>
  </main>
);


export default Analytics;
