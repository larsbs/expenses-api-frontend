import { expect } from 'chai';
import moment from 'moment';

import {
  calcExpensesEvolution,
  calcExpensesByCategory
} from '../../../app/utils/charts';


describe('@Charts', function () {
  const expenses = [
    { created_at: new Date(2016, 1, 10), amount: 232, category: { name: 'Lorem' } },
    { created_at: new Date(2016, 1, 12), amount: 84, category: { name: 'Ipsum' }  },
    { created_at: new Date(2016, 1, 13), amount: 78, category: { name: 'Dolor' }  },
    { created_at: new Date(2016, 1, 17), amount: 64, category: { name: 'Lorem' }  },
    { created_at: new Date(2016, 1, 17), amount: 150, category: { name: 'Lorem' }  },
    { created_at: new Date(2016, 1, 20), amount: 91, category: { name: 'Dolor' }  },
    { created_at: new Date(2016, 1, 24), amount: 32, category: { name: 'Lorem' }  },
  ];
  describe('#calcExpensesEvolution(expenses)', function () {
    it('should return all the data needed to create a chart', function () {
      const result = calcExpensesEvolution(expenses);
      expect(result.title.text).to.not.exists;
      expect(result.xAxis.type).to.equal('datetime');
      expect(result.yAxis.title.text).to.equal('Amount');
      expect(result.tooltip.pointFormat).to.exists;
      expect(result.series.length).to.equal(2);
    });
    it('should return the data of the chart as a [date, amount] array', function () {
      const result = calcExpensesEvolution(expenses);
      for (const data of result.series[0].data) {
        expect(data[0]).to.satisfy(date => moment(date).isValid());
        expect(data[1]).to.not.satisfy(amount => isNaN(amount));
      }
      for (const data of result.series[1].data) {
        expect(data[0]).to.satisfy(date => moment(date).isValid());
        expect(data[1]).to.not.satisfy(amount => isNaN(amount));
      }
    });
    it('should aggregate amounts that happens on the same day', function () {
      const result = calcExpensesEvolution(expenses);
      expect(result.series[0].data.length).to.equal(6);
      expect(result.series[0].data[3][0]).to.equal(Date.UTC(2016, 1, 17));
      expect(result.series[0].data[3][1]).to.equal(214);
    });
  });
  describe('#calcExpensesByCategory(expenses)', function () {
    it('should return all the data needed to create a chart', function () {
      const result = calcExpensesByCategory(expenses);
      expect(result.chart.type).to.equal('pie');
      expect(result.title.text).to.not.exists;
      expect(result.legend).to.deep.equal({
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'middle',
        itemMarginBottom: 10,
        padding: 50
      });
      expect(result.tooltip.pointFormat).to.exists;
      expect(result.plotOptions.pie).to.deep.equal({
        allowPointSelect: true,
        cursor: 'pointer',
        dataLabels: {
          enabled: false
        },
        showInLegend: true
      });
      expect(result.series.length).to.equal(1);
    });
    it('should return the data of the chart as a {category, amount} object', function () {
      const result = calcExpensesByCategory(expenses);
      const categories = ['Lorem', 'Ipsum', 'Dolor'];
      for (const data of result.series[0].data) {
        expect(categories).to.include(data.name);
        expect(data.y).to.not.satisfy(amount => isNaN(amount));
      }
    });
    it('should aggregate amounts that belongs to the same category', function () {
      const result = calcExpensesByCategory(expenses);
      const expected = [
        { name: 'Lorem', y: 478 },
        { name: 'Ipsum', y: 84 },
        { name: 'Dolor', y: 169 },
      ];
      expect(result.series[0].data).to.deep.equal(expected);
    });
  });
});
