import React from 'react';
import { connect } from 'react-redux';

import Sidebar from '../components/Sidebar';
import Spinner from '../components/Spinner';

import styles from '../styles/containers/application.less';



const Loading = () => (
  <div className={styles.loading}>
    <Spinner width="100" height="100" borderRadius="15" />
    <h2 className={styles.loadingTitle}>
      Wait a moment till I prepare everything for you...
    </h2>
  </div>
);


const Application = ({ isLoading, children }) => {
  const loading = (
    <div className={styles.application}>
      <Loading />
    </div>
  );
  const app = (
    <div className={styles.application}>
      <Sidebar styleId="sidebar" />
      {children}
    </div>
  );

  return isLoading ? loading : app;
};


const mapStateToProps = state => {
  return {
    isLoading: state.application.isLoading
  };
};


export default connect(mapStateToProps)(Application);
