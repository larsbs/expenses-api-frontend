import React from 'react';

import Header from '../components/Header';


const breadcrumbs = [{
  icon: 'fa fa-fw fa-bar-chart',
  title: 'Users'
}];

const Users = () => (
  <main>
    <Header breadcrumbs={breadcrumbs}>
      <button>Add Life</button>
    </Header>
  </main>
);


export default Users;
