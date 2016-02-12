import React from 'react';

import Header from '../components/Header';
import DataFilter from '../components/DataFilter';
import DataTable from '../components/DataTable';

import styles from '../styles/containers/users.less';
import headerStyles from '../styles/components/header.less';


const breadcrumbs = [{
  icon: 'fa fa-fw fa-users',
  title: 'Users'
}];

const Users = () => (
  <main>
    <Header breadcrumbs={breadcrumbs}>
      <button className={headerStyles.button}><i className="fa fa-fw fa-plus" /> Add User</button>
    </Header>
    <div className={styles.container}>
      <DataFilter />
      <DataTable />
    </div>
  </main>
);


export default Users;
