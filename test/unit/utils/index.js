import { expect } from 'chai';
import moment from 'moment';

import {
  capitalize,
  getExpensesInRange,
  reverseArray
} from '../../../app/utils';


describe('@Index', function () {
  describe('#capitalize(str)', function () {
    it('should return the received string with the first character to uppercase', function () {
      expect(capitalize('lorem')).to.equal('Lorem');
    });
    it('should set any other character as lowercase', function () {
      expect(capitalize('lOReM')).to.equal('Lorem');
      expect(capitalize('lOReM2123')).to.equal('Lorem2123');
    });
  });
  describe('#getExpensesInRange(expenses, from, to)', function () {
    let expenses;
    before(function () {
      expenses = [{
        created_at: new Date(2016, 1, 20)
      }, {
        created_at: new Date(2016, 1, 23)
      }, {
        created_at: new Date(2016, 1, 30)
      }, {
        created_at: new Date(2016, 2, 3)
      }, {
        created_at: new Date(2016, 2, 5)
      }];
    });
    it('should return the expenses that are in the date range', function () {
      const from = moment(new Date(2016, 1, 24));
      const to = moment(new Date(2016, 2, 4));
      const expected = [expenses[2], expenses[3]];
      const result = getExpensesInRange(expenses, from, to);
      expect(result).to.deep.equal(expected);
    });
    it('should include the expenses at the extremes of the range too', function () {
      const from = moment(new Date(2016, 1, 23));
      const to = moment(new Date(2016, 2, 3));
      const expected = [expenses[1], expenses[2], expenses[3]];
      const result = getExpensesInRange(expenses, from, to);
      expect(result).to.deep.equal(expected);
    });
  });
  describe('#reverseArray(arr)', function () {
    it('should return the received array reversed', function () {
      const expected = [4, 3, 2, 1];
      const result = reverseArray([1, 2, 3, 4]);
      expect(result).to.deep.equal(expected);
    });
    it('should not modify the original array', function () {
      const arr = [1, 2, 3, 4];
      const rArr = reverseArray(arr);
      expect(arr).to.not.deep.equal(rArr);
    });
  });
  describe('#createFakeId()', function () {
    it('should create a random id using date and Math.random()');
  });
});
