import React from 'react';
import { Link } from 'react-router';

import styles from '../styles/components/breadcrumbs.less';


const Crumb = ({ crumb }) => {

  let crumbIcon = crumb.icon ? <i className={crumb.icon} /> : null;

  if (crumb.linkable) {
    return (
      <li className={styles.crumb}>
        <Link to={crumb.link}>
          {crumbIcon}
          {crumb.title}
        </Link>
      </li>
    );
  }

  return (
    <li className={styles.crumb}>
      {crumbIcon}
      {crumb.title}
    </li>
  );
};

const Breadcrumbs = ({ breadcrumbs }) => (
  <ul className={styles.breadcrumbs}>
    {breadcrumbs.map((crumb, i) => <Crumb key={i} crumb={crumb} />)}
  </ul>
);


export default Breadcrumbs;
