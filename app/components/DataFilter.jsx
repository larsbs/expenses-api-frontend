import React from 'react';
import Velocity from 'velocity-animate/velocity';
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

  state = {
    open: false
  };

  render() {
    const { filters } = this.props;

    return (
      <div className={styles.container}>
        <div className={this.state.open ? styles.opened : styles.header} ref={header => this._header = header}>
          <div className={styles.title}>
            Filters
          </div>
          <ul className={styles.actions}>
            <li className={styles.action} onClick={this._handleOnClickToggle.bind(this)}>
              <i className="fa fa-fw fa-filter" />
            </li>
          </ul>
        </div>
        <div className={styles.body} ref={body => this._body = body}>
          <div className={styles.filters}>
            {filters.map((filter, i) => (
              <div className={styles.formGroup} key={i}>
                <label>{filter.label}</label>
                <input defaultValue={filter.value} />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  _handleOnClickToggle() {
    if (this.state.open) {
      Velocity(this._body, 'slideUp', { duration: 500 })
      .then(() => this.setState({ open: !this.state.open }));
    }
    else {
      this.setState({ open: !this.state.open });
      Velocity(this._body, 'slideDown', { duration: 500 });
    }
  }

}

export default DataFilter;
