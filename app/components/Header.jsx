import React from 'react';

import Breadcrumbs from './Breadcrumbs';
import styles from '../styles/components/header.less';


const Header = ({ breadcrumbs, children }) => (
  <div className={styles.header}>
    <Breadcrumbs breadcrumbs={breadcrumbs} />
    <div className={styles.buttons}>
      {children}
    </div>
  </div>
);


export default Header;
