import React from 'react';
import { connect } from 'react-redux';

import { loadApp } from '../actions/application';
import Sidebar from '../components/Sidebar';
import Spinner from '../components/Spinner';
import styles from '../styles/containers/application.less';



class Application extends React.Component {

  render() {
    const { children, isLoading } = this.props;

    let app;
    if (true) {
      app = (
        <div className={styles.application}>
          <div className={styles.loading}>
            <Spinner width="100" height="100" borderRadius="15" />
            <h2 className={styles.loadingTitle}>
              Wait a moment, the app is loading...
            </h2>
          </div>
        </div>
      );
    }
    else {
      app = (
        <div className={styles.application}>
          <Sidebar styleId="sidebar" />
          {children}
        </div>
      );
    }

    return app;
  }

}

const mapStateToProps = state => {
  return {
    isLoading: state.application.isLoading
  };
};


export default connect(mapStateToProps)(Application);
