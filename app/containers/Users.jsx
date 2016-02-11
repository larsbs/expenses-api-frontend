import React from 'react';

import Header from '../components/Header';


const breadcrumbs = [{
  icon: 'fa fa-fw fa-bar-chart',
  title: 'Users'
}];

const Users = () => (
  <Header breadcrumbs={breadcrumbs}>
    <button>Add Life</button>
  </Header>
);


export default Users;
