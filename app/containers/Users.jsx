import React from 'react';
import { connect } from 'react-redux';

import { populateHasMany } from '../utils/populate';
import { setUsersFilter, openAddUserModal, closeAddUserModal } from '../actions/users';

import Header from '../components/Header';
import DataFilter from '../components/DataFilter';
import DataTable from '../components/DataTable';
import AddUserModal from '../components/AddUserModal';

import styles from '../styles/containers/users.less';
import headerStyles from '../styles/components/header.less';


const breadcrumbs = [{
  icon: 'fa fa-fw fa-users',
  title: 'Users'
}];

const usersColumns = [
  { attr: 'id', label: 'Id' },
  { attr: 'username', label: 'Username' },
  { attr: 'expenses.length', label: 'Expenses' },
];

const usersFilters = [
  { attr: 'id', label: 'Id', type: 'range' },
  { attr: 'username', label: 'Username', type: 'match' },
  { attr: 'expenses.length', label: 'Expenses', type: 'range' },
];

const Users = ({
  filteredUsers,
  isModalOpen,
  onChangeFilter,
  onClickAddUser,
  onCloseModal
}) => (
  <main>
    <Header breadcrumbs={breadcrumbs}>
      <button className={headerStyles.button} onClick={onClickAddUser}>
        <i className="fa fa-fw fa-plus" /> Add User
      </button>
    </Header>
    <div classname={styles.usersContent}>
      <div className={styles.container}>
        <DataFilter filters={usersFilters} onChange={onChangeFilter} />
        <DataTable columns={usersColumns} entries={filteredUsers} />
      </div>
    </div>
    <AddUserModal isModalOpen={isModalOpen} onCloseModal={onCloseModal} />
  </main>
);

const mapStateToProps = state => {
  const expenses = state.expenses.entities;
  const users = state.users.entities.map(u => {
    return Object.assign({}, u, {
      ...populateHasMany('expenses', u, expenses, 'user_id')
    });
  });
  const filteredUsers = state.users.filter(users);
  return {
    filteredUsers,
    isModalOpen: state.users.isModalOpen
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onChangeFilter: filter => {
      dispatch(setUsersFilter(filter));
    },
    onClickAddUser: () => {
      dispatch(openAddUserModal());
    },
    onCloseModal: () => {
      dispatch(closeAddUserModal());
    }
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(Users);
