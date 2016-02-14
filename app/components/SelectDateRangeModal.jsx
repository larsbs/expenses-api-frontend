import React from 'react';
import ReactDOM from 'react-dom';
import jQuery from 'jquery';
import Modal from 'react-modal';
import moment from 'moment';
import DatePicker from 'react-date-picker';
import DateField from 'react-date-field';

import 'react-date-picker/base.css';
import 'react-date-picker/theme/hackerone.css';
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
    left: 'auto',
    overflow: 'show'
  }
};

class SelectDateRangeModal extends React.Component {

  state = {
    dateTo: moment(this.props.initialDateTo),
    dateFrom: moment(this.props.initialDateFrom)
  };

  render() {
    const { isModalOpen, onCloseModal } = this.props;
    const dateTo = moment(this.state.dateTo);
    const dateFrom = moment(this.state.dateFrom);

    return (
      <div>
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
                    <DateField
                      ref="inputDateFrom"
                      clearIcon={false}
                      renderInput={props => {
                        props.className = formStyles.inputField;
                      }}>
                      <DatePicker
                        date={dateFrom}
                        maxDate={dateTo.clone().subtract(1, 'day')}
                        onChange={this._handleOnChangeDateFrom.bind(this)}
                        hideFooter={true}/>
                    </DateField>
                    <div className={formStyles.inputFieldSymbol}>
                      <i className="fa fa-fw fa-calendar" />
                    </div>
                  </div>
                </div>
                <div className={formStyles.formGroup}>
                  <label className={formStyles.formLabel}>To</label>
                  <div className={formStyles.inputFieldWithSymbol}>
                    <DateField
                      ref="inputDateTo"
                      clearIcon={false}
                      renderInput={props => {
                        props.className = formStyles.inputField;
                      }}>
                      <DatePicker
                        date={dateTo}
                        maxDate={moment()}
                        onChange={this._handleOnChangeDateTo.bind(this)}
                        hideFooter={true}/>
                    </DateField>
                    <div className={formStyles.inputFieldSymbol}>
                      <i className="fa fa-fw fa-calendar" />
                    </div>
                  </div>
                </div>
              </form>
            </div>
            <div className={modalStyles.footer}>
              <button className={formStyles.submitButton} onClick={this._handleOnClickSubmit.bind(this)}>Select</button>
              <button className={formStyles.button} onClick={onCloseModal}>Cancel</button>
            </div>
          </div>
        </Modal>
      </div>
    );
  }

  _handleOnChangeDateFrom(date) {
    const inputDateFrom = jQuery(ReactDOM.findDOMNode(this.refs.inputDateFrom));
    inputDateFrom.find('input').blur();
    this.setState({ dateFrom: moment(date) });
  }

  _handleOnChangeDateTo(date) {
    const inputDateTo = jQuery(ReactDOM.findDOMNode(this.refs.inputDateTo));
    inputDateTo.find('input').blur();

    const dateTo = moment(date);
    const dateFrom = moment(this.state.dateFrom);

    if (dateFrom >= dateTo) {
      this.setState({ dateFrom: dateTo.clone().subtract(1, 'day') });
    }
    this.setState({ dateTo: dateTo });
  }

  _handleOnClickSubmit(event) {
    event.preventDefault();
    const dateFrom = moment(this.state.dateFrom);
    const dateTo = moment(this.state.dateTo);
    this.props.onDateRangeSelected(dateFrom, dateTo);
    this.props.onCloseModal();
  }

}


export default SelectDateRangeModal;
