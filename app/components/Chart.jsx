import React from 'react';
import HighCharts from 'highcharts';

import styles from '../styles/components/chart.less';


class Chart extends React.Component {

  componentDidMount() {
    HighCharts.chart(this.chartContext, this.props.data);
  }

  render() {
    const { title } = this.props;
    return (
      <div className={styles.chartContainer}>
        <div className={styles.title}>
          {title}
        </div>
        <div className={styles.chartContextContainer}>
          <div className={styles.chartContext} ref={e => this.chartContext = e} />
        </div>
      </div>
    );
  }

}


export default Chart;
