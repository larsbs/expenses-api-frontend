import React from 'react';
import Modal from 'react-modal';
import DatePicker from 'react-datepicker';
import moment from 'moment';

import 'react-datepicker/dist/react-datepicker.css';
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
    width: 400,
    height: 'auto',
    top: 'auto',
    right: 'auto',
    bottom: 'auto',
    left: 'auto'
  }
};

class SelectDateRangeModal extends React.Component {

  state = {
    hasError: false,
    errorMsg: '',
    dateTo: this.props.initialDateTo,
    dateFrom: this.props.initialDateFrom
  };

  render() {
    const { isModalOpen, onCloseModal } = this.props;

    return (
      <Modal isOpen={isModalOpen} onRequestClose={onCloseModal} style={defaultModalStyle}>
        <div className={modalStyles.modal}>
          <div className={modalStyles.header}>
            <div className={modalStyles.title}>Select Date Range</div>
            <i className={modalStyles.close + ' fa fa-fw fa-times'} onClick={onCloseModal} />
          </div>
          <div className={modalStyles.body}>
            <form onSubmit={this._handleOnClickSubmit.bind(this)}>
              <div className={formStyles.formGroup}>
                <label className={formStyles.formLabel}>From</label>
                <div className={formStyles.inputFieldWithSymbol}>
                  <DatePicker
                    className={formStyles.inputField}
                    selected={this.state.dateFrom}
                    maxDate={this.state.dateTo.clone().subtract(1, 'day')}
                    onChange={this._handleOnChangeDateFrom.bind(this)}
                    placeholderText="Click here to select a date" />
                  <div className={formStyles.inputFieldSymbol}>
                    <i className="fa fa-fw fa-calendar" />
                  </div>
                </div>
                <span className={formStyles.errorMessage}>{this.state.errorMsg}</span>
              </div>
              <div className={formStyles.formGroup}>
                <label className={formStyles.formLabel}>To</label>
                <div className={formStyles.inputFieldWithSymbol}>
                  <DatePicker
                    className={formStyles.inputField}
                    selected={this.state.dateTo}
                    onChange={this._handleOnChangeDateTo.bind(this)}
                    maxDate={moment()}
                    placeholderText="Click here to select a date" />
                  <div className={formStyles.inputFieldSymbol}>
                    <i className="fa fa-fw fa-calendar" />
                  </div>
                </div>
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

  _handleOnChangeDateFrom(date) {
    this.setState({ dateFrom: date });
  }

  _handleOnChangeDateTo(date) {
    this.setState({ dateTo: date });
  }

  _removeErrors() {
    this.setState({ hasError: false });
  }

  _handleOnClickSubmit(event) {
    event.preventDefault();
    //const { name, error } = validateCategoryName(this.refs.name.value);
    //this.setState({ errorMsg: error || '', hasError: !!error });

    //if ( ! error) {
      //this.props.onAddCategory(name);
      //this.props.onCloseModal();
    //}
  }

}


export default SelectDateRangeModal;
