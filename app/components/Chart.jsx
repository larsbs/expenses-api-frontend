import React from 'react';
//import Chartjs from 'chart.js/src/core/core';
import Chartjs from 'chart.js/Chart';

import styles from '../styles/components/chart.less';


class Chart extends React.Component {

  componentDidMount() {
    const chart = new Chartjs(this.chartContext, {
      type: 'bar',
      data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [{
          label: '# of Votes',
          data: [12.0, 19.5, 3.0, 5.0, 2.0, 3.0]
        }]
      },
      options:{
        scales:{
          yAxes:[{
            ticks:{
              beginAtZero:true
            }
          }]
        }
      }
    });
  }

  render() {
    return (
      <div className={styles.chartContainer}>
        <div className={styles.title}>
          Expenses Evolution
        </div>
        <div className={styles.chartContextContainer}>
          <canvas className={styles.chartContext} ref={e => this.chartContext = e} />
        </div>
      </div>
    );
  }

}


export default Chart;
