import { expect } from 'chai';

import * as CategoriesActions from '../../../app/actions/categories';


describe('@Categories', function () {
  describe('#setCategoriesFilter(filter)', function () {
    it('should create an action to set the filter in categories', function () {
      const filter = x => x;
      const expectedAction = {
        type: CategoriesActions.SET_CATEGORIES_FILTER,
        payload: {
          filter
        }
      };
      const resultAction = CategoriesActions.setCategoriesFilter(filter);
      expect(resultAction).to.deep.equal(expectedAction);
    });
  });
  describe('#receiveCategories(categories)', function () {
    it('should create an action to receive the categories from fetch', function () {
      const categories = [{ id: 1, name: 'Lorem' }, { id: 2, name: 'Ipsum' }];
      const expectedAction = {
        type: CategoriesActions.RECEIVE_CATEGORIES,
        payload: {
          categories
        }
      };
      const resultAction = CategoriesActions.receiveCategories(categories);
      expect(resultAction).to.deep.equal(expectedAction);
    });
  });
  describe('#addCategory(name)', function () {
    it('should create an action to add a category to the state', function () {
      const name = 'Lorem';
      const expectedAction = {
        type: CategoriesActions.ADD_CATEGORY,
        payload: {
          category: {
            name,
            loading: true
          }
        }
      };
      const resultAction = CategoriesActions.addCategory(name);
      delete resultAction.payload.category.id;  // NOTE: Impossible to test id, because is random generated
      expect(resultAction).to.deep.equal(expectedAction);
    });
  });
  describe('#addCategorySuccess(fakeId, category)', function () {
    it('should create an action to commit a created category into the state', function () {
      const fakeId = 1231232131;
      const category = { id: 1, name: 'Lorem' };
      const expectedAction = {
        type: CategoriesActions.ADD_CATEGORY_SUCCESS,
        payload: {
          fakeId,
          category
        }
      };
      const resultAction = CategoriesActions.addCategorySuccess(fakeId, category);
      expect(resultAction).to.deep.equal(expectedAction);
    });
  });
  describe('#addCategoryFailed(err, fakeId)', function () {
    it('should create an action to revert an ADD_CATEGORY action that has failed', function () {
      const err = new Error();
      const fakeId = 12312412342;
      const expectedAction = {
        type: CategoriesActions.ADD_CATEGORY_FAILED,
        payload: {
          fakeId,
          err
        }
      };
      const resultAction = CategoriesActions.addCategoryFailed(err, fakeId);
      expect(resultAction).to.deep.equal(expectedAction);
    });
  });
  describe('#openAddCategoryModal()', function () {
    it('should create an action to show the modal for create a category', function () {
      const expectedAction = {
        type: CategoriesActions.OPEN_ADD_CATEGORY_MODAL
      };
      const resultAction = CategoriesActions.openAddCategoryModal();
      expect(resultAction).to.deep.equal(expectedAction);
    });
  });
  describe('#closeAddCategoryModal()', function () {
    it('should create an action to close the modal for create a category', function () {
      const expectedAction = {
        type: CategoriesActions.CLOSE_ADD_CATEGORY_MODAL
      };
      const resultAction = CategoriesActions.closeAddCategoryModal();
      expect(resultAction).to.deep.equal(expectedAction);
    });
  });
});
