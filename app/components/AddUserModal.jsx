import React from 'react';
import Modal from 'react-modal';

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

const AddUserModal = ({ isModalOpen, onCloseModal }) => (
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
            <input className={formStyles.inputField} type="text" />
          </div>
        </form>
      </div>
      <div className={modalStyles.footer}>
        <button className={formStyles.submitButton}>Add</button>
        <button className={formStyles.button}>Cancel</button>
      </div>
    </div>
  </Modal>
);


export default AddUserModal;
