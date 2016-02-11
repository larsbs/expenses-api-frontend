import React from 'react';
import { Link } from 'react-router';

import styles from '../styles/components/sidebar.less';


const Sidebar = ({ styleId }) => (
  <div className={styles.sidebar + ' ' + styleId}>
    <section className={styles.sidebarHeader}>
      <span>Expens</span><span>track</span>
    </section>
    <nav className={styles.sidebarNavigation}>
      <ul className={styles.navList}>
        <li className={styles.navItem}>
          <Link to="/"><i className="fa fa-fw fa-bar-chart" /> Analytics</Link>
        </li>
        <li className={styles.navItem}>
          <Link to="/expenses"><i className="fa fa-fw fa-credit-card" /> Expenses</Link>
        </li>
        <li className={styles.navItem}>
          <Link to="/users"><i className="fa fa-fw fa-users" /> Users</Link>
        </li>
        <li className={styles.navItem}>
          <Link to="/categories"><i className="fa fa-fw fa-cubes" /> Categories</Link>
        </li>
      </ul>
    </nav>
  </div>
);


export default Sidebar;
