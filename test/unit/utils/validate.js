import { expect } from 'chai';

import {
  validateUsername,
  validateCategoryName,
  validateExpenseNote,
  validateExpenseAmount
} from '../../../app/utils/validate';


describe('@Validate', function () {
  describe('#validateUsername(username)', function () {
    it('should return an error when the username is empty', function () {
      const { error } = validateUsername('');
      expect(error).to.exists;
    });
    it('should return the username if valid', function () {
      const { username, error } = validateUsername('Lorem');
      expect(error).to.not.exists;
      expect(username).to.equal('Lorem');
    });
  });
  describe('#validateCategoryName(name)', function () {
    it('should return an error when the name is empty', function () {
      const { error } = validateCategoryName('');
      expect(error).to.exists;
    });
    it('should return the name if valid', function () {
      const { name, error } = validateCategoryName('Lorem');
      expect(error).to.not.exists;
      expect(name).to.equal('Lorem');
    });
  });
  describe('#validateExpenseNote(note)', function () {
    it('should return an error when the note is empty', function () {
      const { error } = validateExpenseNote('');
      expect(error).to.exists;
    });
    it('should return the note if valid', function () {
      const { note, error } = validateExpenseNote('Lorem');
      expect(error).to.not.exists;
      expect(note).to.equal('Lorem');
    });
  });
  describe('#validateExpenseAmount', function () {
    it('should return an error when the amount is not a valid number', function () {
      const { error } = validateExpenseAmount('231,231');
      expect(error).to.exists;
    });
    it('should return the amount if valid', function () {
      const { amount, error } = validateExpenseAmount(232.23);
      expect(error).to.not.exists;
      expect(amount).to.equal(232.23);
    });
  });
});
