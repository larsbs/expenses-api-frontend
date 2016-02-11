import React from 'react';
import styles from '../styles/components/latest-activity.less';


const Activity = () => (
  <div className={styles.activity}>
    <div className={styles.cronoDot}></div>
    <div className={styles.activityContent}>
      <div className={styles.date}>
        20/01/2016 &nbsp; 2:35 P.M
      </div>
      <div className={styles.event}>
        Added new expense of <span className={styles.amount}>55.23€</span> to <strong>Category</strong> by <a href="javascript:;">User</a>
      </div>
    </div>
  </div>
);

const LatestActivity = () => (
  <section className={styles.latestActivity}>
    <div className={styles.title}>
      <i className="fa fa-fw fa-list-ul" /> Latest activity
    </div>
    <div className={styles.activitiesListContainer}>
      <div className={styles.cronoBar}></div>
      <div className={styles.activitiesList}>
        <Activity />
      </div>
    </div>
  </section>
);


export default LatestActivity;
