import { expect } from 'chai';

import * as UsersActions from '../../../app/actions/users';
import users from '../../../app/reducers/users';


describe('@Users', function () {
  it('should return the initial state when state param is undefined', function () {
    const initialState = {
      entities: [],
      filter: x => x,
      isModalOpen: false
    };
    const resultState = users(undefined, {});
    expect(JSON.stringify(resultState)).to.equal(JSON.stringify(initialState));
  });
  it('should handle SET_USERS_FILTER', function () {
    const filter = x => x.map(x => x);
    const initialState = {
      entities: [],
      filter: x => x,
      isModalOpen: false
    };
    const expectedState = Object.assign({}, initialState, {
      filter,
    });
    const resultState = users(initialState, UsersActions.setUsersFilter(filter));
    expect(resultState).to.deep.equal(expectedState);
  });
  it('should handle ADD_USER', function () {
    const user = {
      id: 'testing',
      username: 'Lorem',
      loading: true
    };
    const initialState = {
      entities: [],
      filter: x => x,
      isModalOpen: false
    };
    const expectedState = Object.assign({}, initialState, {
      entities: [
        user,
        ...initialState.entities
      ]
    });
    const resultState = users(initialState, UsersActions.addUser(user.username, user.id));
    expect(resultState).to.deep.equal(expectedState);
  });
  it('should handle ADD_USER_SUCCESS', function () {
    const fakeUser = {
      id: 'testing',
      username: 'Lorem',
      loading: true
    };
    const user = {
      id: 1,
      username: 'Lorem'
    };
    const initialState = {
      entities: [fakeUser],
      filter: x => x,
      isModalOpen: false
    };
    const expectedState = Object.assign({}, initialState, {
      entities: initialState.entities.map(e => {
        if (e.loading && e.id === fakeUser.id) {
          return user;
        }
        return e;
      })
    });
    const resultState = users(initialState, UsersActions.addUserSuccess('testing', user));
    expect(resultState).to.deep.equal(expectedState);
  });
  it('should handle ADD_USER_FAILED', function () {
    const fakeUser = {
      id: 'testing',
      username: 'Lorem',
      loading: true
    };
    const err = new Error();
    const initialState = {
      entities: [fakeUser],
      filter: x => x,
      isModalOpen: false
    };
    const expectedState = Object.assign({}, initialState, {
      entities: initialState.entities.filter(e => {
        return ! e.loading && e.id !== fakeUser.id;
      })
    });
    const resultState = users(initialState, UsersActions.addUserFailed(err, 'testing'));
    expect(resultState).to.deep.equal(expectedState);
  });
  it('should handle OPEN_ADD_USER_MODAL', function () {
    const initialState = {
      entities: [],
      filter: x => x,
      isModalOpen: false,
    };
    const expectedState = Object.assign({}, initialState, {
      isModalOpen: true
    });
    const resultState = users(initialState, UsersActions.openAddUserModal());
    expect(resultState).to.deep.equal(expectedState);
  });
  it('should handle CLOSE_ADD_USER_MODAL', function () {
    const initialState = {
      entities: [],
      filter: x => x,
      isModalOpen: true,
    };
    const expectedState = Object.assign({}, initialState, {
      isModalOpen: false
    });
    const resultState = users(initialState, UsersActions.closeAddUserModal());
    expect(resultState).to.deep.equal(expectedState);
  });
});
