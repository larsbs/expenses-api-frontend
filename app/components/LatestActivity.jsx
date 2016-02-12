import React from 'react';
import moment from 'moment';

import { capitalize, reverseArray } from '../utils';

import styles from '../styles/components/latest-activity.less';


const Activity = ({ expense }) => {
  const date = moment(expense.created_at).format('DD/MM/YYYY');
  const time = moment(expense.created_at).format('HH:MM A');
  return (
    <div className={styles.activity}>
      <div className={styles.cronoDot}></div>
      <div className={styles.activityContent}>
        <div className={styles.date}>
          {date} &nbsp; {time}
        </div>
        <div className={styles.event}>
          Added new expense of <span className={styles.amount}>{expense.amount}€</span> to <strong>{capitalize(expense.category.name)}</strong> and assigned to <a href="javascript:;">{expense.user.username}</a>
        </div>
      </div>
    </div>
  );
};

const LatestActivity = ({ expenses }) => (
  <section className={styles.latestActivity}>
    <div className={styles.title}>
      <i className="fa fa-fw fa-list-ul" /> Latest activity
    </div>
    <div className={styles.activitiesListContainer}>
      <div className={styles.cronoBar}></div>
      <div className={styles.activitiesList}>
        {reverseArray(expenses).slice(0, 10).map(expense => (
          <Activity expense={expense} key={expense.id} />
        ))}
      </div>
    </div>
  </section>
);


export default LatestActivity;
