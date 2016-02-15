import { expect } from 'chai';

import {
  fetchAll,
  createUser,
  createCategory,
  createExpense,
} from '../../../app/utils/api';


describe('@Api', function () {
  describe('#fetchAll()', function () {
    let fetchResult;
    before(function (done) {
      fetchAll().then(result => {
        fetchResult = result;
        done();
      });
    });
    it('should return the expenses in the first index of the result array', function () {
      expect(fetchResult[0]).to.exists;
      expect(fetchResult[0][0].note).to.exists;
    });
    it('should return the users in the second index of the result array', function () {
      expect(fetchResult[1]).to.exists;
      expect(fetchResult[1][0].username).to.exists;
    });
    it('should return the categories in the third index of the result array', function () {
      expect(fetchResult[2]).to.exists;
      expect(fetchResult[2][0].name).to.exists;
    });
  });
  describe('#createUser(user)', function () {
    it.skip('should create a new user in the back-end', function (done) {
    });
    it.skip('should return the created user', function (done) {
    });
  });
  describe('#createCategory(category)', function () {
    it.skip('should create a new category in the back-end', function (done) {
    });
    it.skip('should return the created category', function (done) {
    });
  });
  describe('#createExpense(expense)', function () {
    it.skip('should create a new expense in the back-end', function (done) {
    });
    it.skip('should return the created expense', function (done) {
    });
  });
});
