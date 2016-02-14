import React from 'react';
import Modal from 'react-modal';

import { validateCategoryName } from '../utils/validate';

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

class AddCategoryModal extends React.Component {

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
            <div className={modalStyles.title}>Add Category</div>
            <i className={modalStyles.close + ' fa fa-fw fa-times'} onClick={onCloseModal} />
          </div>
          <div className={modalStyles.body}>
            <form onSubmit={this._handleOnClickSubmit.bind(this)}>
              <div className={formStyles.formGroup}>
                <label className={formStyles.formLabel}>Name</label>
                <input
                  ref="name"
                  className={formStyles.inputField}
                  placeholder="Write a name for the category"
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

  _handleOnClickSubmit(event) {
    event.preventDefault();
    const { name, error } = validateCategoryName(this.refs.name.value);
    this.setState({ errorMsg: error || '', hasError: !!error });

    if ( ! error) {
      this.props.onAddCategory(name);
      this.props.onCloseModal();
    }
  }

}


export default AddCategoryModal;
