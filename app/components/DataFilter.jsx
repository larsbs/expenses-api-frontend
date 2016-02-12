import React from 'react';
import styles from '../styles/components/data-filter.less';


const defaultFilters = [
  { attr: 'id', label: 'Id', type: 'range' },
  { attr: 'url', label: 'Url', type: 'match', linkable: true },
  { attr: 'name', label: 'Name', type: 'match' },
  { attr: 'address', label: 'Address', type: 'match' },
];

class DataFilter extends React.Component {

  static defaultProps = {
    filters: defaultFilters
  };

  render() {
    const { filters } = this.props;

    return (
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.title}>
            Filters
          </div>
          <ul className={styles.actions}>
            <li className={styles.action}>
              <i className="fa fa-fw fa-filter" />
            </li>
          </ul>
        </div>
        <div className={styles.body}>
          <div className={styles.filters}>
            {filters.map(filter => (
              <div className={styles.formGroup}>
                <label>{filter.label}</label>
                <input defaultValue={filter.value} />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

}

export default DataFilter;
