import React from 'react';
import { connect } from 'react-redux';

import Sidebar from '../components/Sidebar';
import styles from '../styles/containers/application.less';


const Application = (props) => (
  <div className={styles.application}>
    <Sidebar />
    {props.children}
  </div>
);


export default connect()(Application);
