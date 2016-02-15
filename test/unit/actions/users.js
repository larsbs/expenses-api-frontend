import { expect } from 'chai';

import * as UsersActions from '../../../app/actions/users';


describe('@Users', function () {
  describe('#setUsersFilter(filter)', function () {
    it('should create an action to set the filter in users', function () {
      const filter = x => x;
      const expectedAction = {
        type: UsersActions.SET_USERS_FILTER,
        payload: {
          filter
        }
      };
      const resultAction = UsersActions.setUsersFilter(filter);
      expect(resultAction).to.deep.equal(expectedAction);
    });
  });
  describe('#receiveUsers(users)', function () {
    it('should create an action to receive the users from fetch', function () {
      const users = [{ id: 1, username: 'Lorem' }, { id: 2, username: 'Ipsum' }];
      const expectedAction = {
        type: UsersActions.RECEIVE_USERS,
        payload: {
          users
        }
      };
      const resultAction = UsersActions.receiveUsers(users);
      expect(resultAction).to.deep.equal(expectedAction);
    });
  });
  describe('#addUser(name)', function () {
    it('should create an action to add a user to the state', function () {
      const username = 'Lorem';
      const expectedAction = {
        type: UsersActions.ADD_USER,
        payload: {
          user: {
            username,
            loading: true
          }
        }
      };
      const resultAction = UsersActions.addUser(username);
      delete resultAction.payload.user.id;  // NOTE: Impossible to test id, because is random generated
      expect(resultAction).to.deep.equal(expectedAction);
    });
  });
  describe('#addUserSuccess(fakeId, user)', function () {
    it('should create an action to commit a created user into the state', function () {
      const fakeId = 1231232131;
      const user = { id: 1, username: 'Lorem' };
      const expectedAction = {
        type: UsersActions.ADD_USER_SUCCESS,
        payload: {
          fakeId,
          user
        }
      };
      const resultAction = UsersActions.addUserSuccess(fakeId, user);
      expect(resultAction).to.deep.equal(expectedAction);
    });
  });
  describe('#addUserFailed(err, fakeId)', function () {
    it('should create an action to revert an ADD_USER action that has failed', function () {
      const err = new Error();
      const fakeId = 12312412342;
      const expectedAction = {
        type: UsersActions.ADD_USER_FAILED,
        payload: {
          fakeId,
          err
        }
      };
      const resultAction = UsersActions.addUserFailed(err, fakeId);
      expect(resultAction).to.deep.equal(expectedAction);
    });
  });
  describe('#openAddUserModal()', function () {
    it('should create an action to show the modal for create a user', function () {
      const expectedAction = {
        type: UsersActions.OPEN_ADD_USER_MODAL
      };
      const resultAction = UsersActions.openAddUserModal();
      expect(resultAction).to.deep.equal(expectedAction);
    });
  });
  describe('#closeAddUserModal()', function () {
    it('should create an action to close the modal for create a user', function () {
      const expectedAction = {
        type: UsersActions.CLOSE_ADD_USER_MODAL
      };
      const resultAction = UsersActions.closeAddUserModal();
      expect(resultAction).to.deep.equal(expectedAction);
    });
  });
});
