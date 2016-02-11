import React from 'react';
import styles from '../styles/components/data-table.less';


class DataTable extends React.Component {

  static defaultProps = {
    columns: [
      { attr: 'id', label: 'Id' },
      { attr: 'url', label: 'Url' },
      { attr: 'name', label: 'Name' },
      { attr: 'address', label: 'Address' },
    ],
    entries: [{
      id: 1,
      name: 'Lorem Ipsum',
      url: 'http://lorem.herokuapp.com',
      address: 'C/ Lorem, 7',
    }, {
      id: 2,
      name: 'Dolor Sit Amet',
      url: 'http://dolor.herokuapp.com',
      address: 'C/ Dolor, 7',
    }]
  };

  render() {
    const currentPage = 1;
    const { columns, entries } = this.props;
    const { firstShownEntry, lastShownEntry, shownEntries } = this._getShownEntries();

    return (
      <div className={styles.DataTableContainer + ' DataTable-container'}>
        <div className={styles.shownItemsControls}>
          <div className={styles.shownItemsSelectorContainer}>
            <select className={styles.shownItemsSelector}>
              <option>10</option>
              <option>30</option>
              <option>50</option>
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
                    {entry[column.attr]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        <div className={styles.tablePagination}>
          <ul className={styles.tablePaginationControl}>
            <li>
              <i className="fa fa-caret-left fa-fw" /> Prev
            </li>
            <li>
              <input type="text" defaultValue={currentPage} />
            </li>
            <li>
              Next <i className="fa fa-caret-right fa-fw" />
            </li>
          </ul>
        </div>
      </div>
    );
  }

  _getShownEntries() {
    return {
      firstShownEntry: 0,
      lastShownEntry: 1,
      shownEntries: this.props.entries
    };
  }

}


export default DataTable;
