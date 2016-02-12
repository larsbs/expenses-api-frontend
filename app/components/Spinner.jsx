import React from 'react';
import styles from '../styles/components/spinner.less';


const Spinner = ({ width, height, borderRadius }) => (
  <div className={styles.spinner} style={{ width, height }}>
    <div className={styles.cube1} style={{ borderTopLeftRadius: borderRadius }}></div>
    <div className={styles.cube2}></div>
    <div className={styles.cube3}></div>
    <div className={styles.cube4}></div>
    <div className={styles.cube5}></div>
    <div className={styles.cube6}></div>
    <div className={styles.cube7}></div>
    <div className={styles.cube8}></div>
    <div className={styles.cube9} style={{ borderBottomRightRadius: borderRadius }}></div>
  </div>
);


export default Spinner;
