import React from 'react';
import styles from '../styles/components/data-table.less';


function isValidPage(currentPage) {
  return currentPage && ! isNaN(currentPage) && currentPage !== '';
}


function ifNaNDefault(value, defaultValue) {
  return isNaN(value) ? defaultValue : value;
}


class DataTable extends React.Component {

  state = {
    entriesPerPage: 10,
    currentPage: 1
  };

  componentDidUpdate() {
    this._totalPages = Math.ceil(this.props.entries.length / this.state.entriesPerPage);
  }

  render() {
    const { columns, entries } = this.props;
    const { firstShownEntry, lastShownEntry, shownEntries } = this._getShownEntries();

    return (
      <div className={styles.DataTableContainer + ' DataTable-container'}>
        <div className={styles.shownItemsControls}>
          <div className={styles.shownItemsSelectorContainer}>
            <select
              className={styles.shownItemsSelector}
              value={this.state.entriesPerPage}
              onChange={this._handleOnChangeEntriesPerPage.bind(this)}
            >
              <option value="10">10</option>
              <option value="30">30</option>
              <option value="50">50</option>
            </select>
            entries per page
          </div>
          <div className={styles.shownItemsCount}>
            Showing {firstShownEntry} to {lastShownEntry} of {entries.length} entries
          </div>
        </div>
        <table className={styles.dataTable}>
          <thead>
            <tr>
              {columns.map((column, i) => <th key={i}>{column.label}</th>)}
            </tr>
          </thead>
          <tbody>
            {shownEntries.map(entry => (
              <tr key={entry.id}>
                {columns.map((column, i) => (
                  <td key={entry.id + '-' + i}>
                    {column.formatter ? column.formatter(
                      column.attr.split('.').reduce((o,i)=>o[i], entry)
                     ) : column.attr.split('.').reduce((o,i)=>o[i], entry)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        <div className={styles.tablePagination}>
          <ul className={styles.tablePaginationControl}>
            <li onClick={this._handleOnClickPrev.bind(this)}>
              <i className="fa fa-caret-left fa-fw" /> Prev
            </li>
            <li>
              <input type="text" value={this.state.currentPage} onChange={this._handleOnChangePage.bind(this)}/>
            </li>
            <li onClick={this._handleOnClickNext.bind(this)}>
              Next <i className="fa fa-caret-right fa-fw" />
            </li>
          </ul>
        </div>
      </div>
    );
  }


  _getShownEntries() {
    let { currentPage } = this.state;

    if ( ! isValidPage(currentPage) || currentPage > this._totalPages) {
      currentPage = 1;
    }

    const firstShownEntry = ifNaNDefault(
      Math.min(
        this.props.entries.length,
        this.state.entriesPerPage * currentPage - this.state.entriesPerPage + 1
      ), 0
    );
    const lastShownEntry = ifNaNDefault(
      Math.min(
        this.state.entriesPerPage * currentPage,
        this.props.entries.length
      ), 0
    );
    const shownEntries = this.props.entries.slice(firstShownEntry - 1, lastShownEntry);
    return {
      firstShownEntry,
      lastShownEntry,
      shownEntries
    };
  }

  _handleOnChangeEntriesPerPage(event) {
    this.setState({ entriesPerPage: event.target.value });
  }

  _handleOnClickPrev() {
    if (this.state.currentPage > 1) {
      this.setState({ currentPage: this.state.currentPage - 1 });
    }
  }

  _handleOnClickNext() {
    if (this.state.currentPage < this._totalPages) {
      this.setState({ currentPage: this.state.currentPage + 1 });
    }
  }

  _handleOnChangePage(event) {
    this.setState({ currentPage: event.target.value });
  }

}


export default DataTable;
