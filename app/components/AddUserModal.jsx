import React from 'react';
import Modal from 'react-modal';

import { validateUsername } from '../utils/validate';

import formStyles from '../styles/forms.less';
import modalStyles from '../styles/modal.less';


const defaultModalStyle = {
  overlay: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)'
  },
  content: {
    position: 'relative',
    width: 800,
    height: 'auto',
    top: 'auto',
    right: 'auto',
    bottom: 'auto',
    left: 'auto'
  }
};

class AddUserModal extends React.Component {

  state = {
    hasError: false,
    errorMsg: ''
  };

  render() {
    const { isModalOpen, onCloseModal } = this.props;

    return (
      <Modal isOpen={isModalOpen} onRequestClose={onCloseModal} style={defaultModalStyle}>
        <div className={modalStyles.modal}>
          <div className={modalStyles.header}>
            <div className={modalStyles.title}>Add User</div>
            <i className={modalStyles.close + ' fa fa-fw fa-times'} onClick={onCloseModal} />
          </div>
          <div className={modalStyles.body}>
            <form>
              <div className={formStyles.formGroup}>
                <label className={formStyles.formLabel}>Username</label>
                <input
                  ref="username"
                  placeholder="Write an username for the user"
                  className={this.state.hasError ? formStyles.errorInputField : formStyles.inputField}
                  type="text"
                  onFocus={this._removeErrors.bind(this)} />
                <span className={formStyles.errorMessage}>{this.state.errorMsg}</span>
              </div>
            </form>
          </div>
          <div className={modalStyles.footer}>
            <button className={formStyles.submitButton} onClick={this._handleOnClickSubmit.bind(this)}>Add</button>
            <button className={formStyles.button} onClick={onCloseModal}>Cancel</button>
          </div>
        </div>
      </Modal>
    );
  }

  _removeErrors() {
    this.setState({ hasError: false });
  }

  _handleOnClickSubmit() {
    const { username, error } = validateUsername(this.refs.username.value);
    this.setState({ errorMsg: error || '', hasError: !!error });

    if ( ! error) {
      this.props.onAddUser(username);
      this.props.onCloseModal();
    }
  }

}


export default AddUserModal;
