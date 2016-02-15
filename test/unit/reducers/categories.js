import { expect } from 'chai';

import * as CategoriesActions from '../../../app/actions/categories';
import categories from '../../../app/reducers/categories';


describe('@Categories', function () {
  it('should return the initial state when state param is undefined', function () {
    const initialState = {
      entities: [],
      filter: x => x,
      isModalOpen: false
    };
    const resultState = categories(undefined, {});
    expect(JSON.stringify(resultState)).to.equal(JSON.stringify(initialState));
  });
  it('should handle SET_CATEGORIES_FILTER', function () {
    const filter = x => x.map(x => x);
    const initialState = {
      entities: [],
      filter: x => x,
      isModalOpen: false
    };
    const expectedState = Object.assign({}, initialState, {
      filter,
    });
    const resultState = categories(initialState, CategoriesActions.setCategoriesFilter(filter));
    expect(resultState).to.deep.equal(expectedState);
  });
  it('should handle ADD_CATEGORY', function () {
    const category = {
      id: 'testing',
      name: 'Lorem',
      loading: true
    };
    const initialState = {
      entities: [],
      filter: x => x,
      isModalOpen: false
    };
    const expectedState = Object.assign({}, initialState, {
      entities: [
        category,
        ...initialState.entities
      ]
    });
    const resultState = categories(initialState, CategoriesActions.addCategory(category.name, category.id));
    expect(resultState).to.deep.equal(expectedState);
  });
  it('should handle ADD_CATEGORY_SUCCESS', function () {
    const fakeCategory = {
      id: 'testing',
      name: 'Lorem',
      loading: true
    };
    const category = {
      id: 1,
      name: 'Lorem'
    };
    const initialState = {
      entities: [fakeCategory],
      filter: x => x,
      isModalOpen: false
    };
    const expectedState = Object.assign({}, initialState, {
      entities: initialState.entities.map(e => {
        if (e.loading && e.id === fakeCategory.id) {
          return category;
        }
        return e;
      })
    });
    const resultState = categories(initialState, CategoriesActions.addCategorySuccess('testing', category));
    expect(resultState).to.deep.equal(expectedState);
  });
  it('should handle ADD_CATEGORY_FAILED', function () {
    const fakeCategory = {
      id: 'testing',
      name: 'Lorem',
      loading: true
    };
    const err = new Error();
    const initialState = {
      entities: [fakeCategory],
      filter: x => x,
      isModalOpen: false
    };
    const expectedState = Object.assign({}, initialState, {
      entities: initialState.entities.filter(e => {
        return ! e.loading && e.id !== fakeCategory.id;
      })
    });
    const resultState = categories(initialState, CategoriesActions.addCategoryFailed(err, 'testing'));
    expect(resultState).to.deep.equal(expectedState);
  });
  it('should handle OPEN_ADD_CATEGORY_MODAL', function () {
    const initialState = {
      entities: [],
      filter: x => x,
      isModalOpen: false,
    };
    const expectedState = Object.assign({}, initialState, {
      isModalOpen: true
    });
    const resultState = categories(initialState, CategoriesActions.openAddCategoryModal());
    expect(resultState).to.deep.equal(expectedState);
  });
  it('should handle CLOSE_ADD_CATEGORY_MODAL', function () {
    const initialState = {
      entities: [],
      filter: x => x,
      isModalOpen: true,
    };
    const expectedState = Object.assign({}, initialState, {
      isModalOpen: false
    });
    const resultState = categories(initialState, CategoriesActions.closeAddCategoryModal());
    expect(resultState).to.deep.equal(expectedState);
  });
});
