import React from 'react';
import { connect } from 'react-redux';

import { populateHasMany } from '../utils/populate';
import { setCategoriesFilter, openAddCategoryModal, closeAddCategoryModal } from '../actions/categories';
import { capitalize } from '../utils';

import Header from '../components/Header';
import DataFilter from '../components/DataFilter';
import DataTable from '../components/DataTable';
import AddCategoryModal from '../components/AddCategoryModal';

import styles from '../styles/containers/expenses.less';
import headerStyles from '../styles/components/header.less';


const breadcrumbs = [{
  icon: 'fa fa-fw fa-cubes',
  title: 'Categories'
}];

const categoriesColumns = [
  { attr: 'id', label: 'Id' },
  { attr: 'name', label: 'Name', formatter: v => capitalize(v) },
  { attr: 'expenses.length', label: 'Expenses' },
];

const categoriesFilters = [
  { attr: 'id', label: 'Id', type: 'range' },
  { attr: 'name', label: 'Name', type: 'match' },
  { attr: 'expenses.length', label: 'Expenses', type: 'range' },
];

const Categories = ({
  filteredCategories,
  isModalOpen,
  onCloseModal,
  onClickAddCategory,
  onChangeFilter
}) => (
  <main>
    <Header breadcrumbs={breadcrumbs}>
      <button className={headerStyles.button} onClick={onClickAddCategory}>
        <i className="fa fa-fw fa-plus" /> Add Category
      </button>
    </Header>
    <div className={styles.container}>
      <DataFilter filters={categoriesFilters} onChange={onChangeFilter} />
      <DataTable columns={categoriesColumns} entries={filteredCategories} />
    </div>
    <AddCategoryModal isModalOpen={isModalOpen} onCloseModal={onCloseModal} />
  </main>
);

const mapStateToProps = state => {
  const expenses = state.expenses.entities;
  const categories = state.categories.entities.map(c => {
    return Object.assign({}, c, {
      ...populateHasMany('expenses', c, expenses, 'category_id')
    });
  });
  const filteredCategories = state.categories.filter(categories);
  return {
    filteredCategories,
    isModalOpen: state.categories.isModalOpen
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onChangeFilter: filter => {
      dispatch(setCategoriesFilter(filter));
    },
    onClickAddCategory: () => {
      dispatch(openAddCategoryModal());
    },
    onCloseModal: () => {
      dispatch(closeAddCategoryModal());
    }
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(Categories);
