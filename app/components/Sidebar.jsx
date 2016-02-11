import React from 'react';
import styles from '../styles/components/sidebar.less';


const Sidebar = ({ styleId }) => (
  <div className={styles.sidebar + ' ' + styleId}>
    <section className={styles.sidebarHeader}>
      <span>Expens</span><span>track</span>
    </section>
    <nav className={styles.sidebarNavigation}>
      <ul className={styles.navList}>
        <li className={styles.navItem}>
          <a href="javascript:;"><i className="fa fa-fw fa-bar-chart" /> Analytics</a>
        </li>
        <li className={styles.navItem}>
          <a href="javascript:;"><i className="fa fa-fw fa-credit-card" /> Expenses</a>
        </li>
        <li className={styles.navItem}>
          <a href="javascript:;"><i className="fa fa-fw fa-users" /> Users</a>
        </li>
        <li className={styles.navItem}>
          <a href="javascript:;"><i className="fa fa-fw fa-cubes" /> Categories</a>
        </li>
      </ul>
    </nav>
  </div>
);


export default Sidebar;
