import React from 'react';
import { connect } from 'react-redux';

import { loadApp } from '../actions/application';
import Sidebar from '../components/Sidebar';
import styles from '../styles/containers/application.less';



class Application extends React.Component {

  componentDidMount() {
    const { shouldLoad, dispatch } = this.props;
    dispatch(loadApp());
  }

  render() {
    const { children, isLoading } = this.props;

    let app;
    if (isLoading) {
      app = (
        <div className={styles.application}>
          Loading...
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
  //const shouldLoad = (
    //state.users.entities.length < 1 ||
    //state.expenses.entities.length < 1 ||
    //state.categories.entities.length < 1
  //);

  const shouldLoad = false;
  return {
    shouldLoad,
    isLoading: state.isFetching && shouldLoad
  };
};


export default connect(mapStateToProps)(Application);
