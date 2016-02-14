import React from 'react';
import Modal from 'react-modal';

import {
  validateExpenseNote,
  validateExpenseAmount,
} from '../utils/validate';
import { capitalize } from '../utils';

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

const col2Style = {
  width: 'calc(50% - 10px)',
  display: 'inline-block',
};


class AddExpenseModal extends React.Component {

  state = {
    hasError: false,
    errorMsg: ''
  };

  render() {
    const { isModalOpen, onCloseModal, categories, users } = this.props;

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
                <label className={formStyles.formLabel}>Amount</label>
                <div className={formStyles.inputFieldWithSymbol}>
                  <input
                    ref="amount"
                    placeholder="Write the amount of the expense"
                    className={formStyles.inputField}
                    type="text" />
                  <div className={formStyles.inputFieldSymbol}>
                    <i className="fa fa-fw fa-eur" />
                  </div>
                </div>
              </div>
              <div className={formStyles.formGroup}>
                <label className={formStyles.formLabel}>Note</label>
                <textarea
                  ref="note"
                  placeholder="Write a note to remember the expense"
                  className={formStyles.textareaField} />
              </div>
              <div className={formStyles.formGroup} style={col2Style}>
                <label className={formStyles.formLabel}>Category</label>
                <select ref="category" className={formStyles.inputField}>
                  {categories.map(c => (
                    <option key={c.id} value={c.id}>{capitalize(c.name)}</option>
                  ))}
                </select>
              </div>
              <div className={formStyles.formGroup} style={Object.assign({}, col2Style, { marginLeft: 20 })}>
                <label className={formStyles.formLabel}>User</label>
                <select ref="user" className={formStyles.inputField}>
                  {users.map(u => (
                    <option key={u.id} value={u.id}>{u.username}</option>
                  ))}
                </select>
              </div>
            </form>
          </div>
          <div className={modalStyles.footer}>
            <button className={formStyles.submitButton}>Add</button>
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
    const { note, error: noteError } = validateExpenseNote(this.refs.note.value);
    const { amount, error: amountError } = validateExpenseAmount(this.refs.amount.value);
    const category = this.refs.category.value;
    const user = this.refs.user.value;

    this.setState({ noteErrorMsg: noteError || '', hasError: !!noteError });
    this.setState({ amountErrorMsg: amountError || '', hasError: !!amountError });

    if ( ! this.state.hasError) {
      this.props.onAddExpense(note, amount, category, user);
      this.props.onCloseModal();
    }
  }

}


export default AddExpenseModal;
