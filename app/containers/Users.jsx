import React from 'react';

import Header from '../components/Header';
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
  </main>
);


export default Users;
