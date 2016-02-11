import React from 'react';

import Header from '../components/Header';
import LatestActivity from '../components/LatestActivity';
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
        <span className={styles.dateRange}>Jan 2016 - Feb 2016</span>
      </div>
      <LatestActivity />
    </div>
  </main>
);


export default Analytics;
