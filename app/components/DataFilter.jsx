import React from 'react';
import Velocity from 'velocity-animate/velocity';
import styles from '../styles/components/data-filter.less';


function matchFilter(attr, condition) {
  return item => {
    const itemAttr = attr.split('.').reduce((o, i) => o[i], item);
    return itemAttr.toLowerCase().indexOf(condition.toLowerCase()) > -1;
  };
}


function rangeFilter(attr, condition) {
  const pattern = /^([\d\.]+)(-)([\d\.]+)$|^([<>])([\d\.]+)$|^([\d\.]+)$/;
  const result = pattern.exec(condition);
  if (result) {
    const [, min, rangeOp, max, compOp, val, exact] = result;
    return item => {
      const itemAttr = attr.split('.').reduce((o, i) => o[i], item);
      if (rangeOp) {
        return itemAttr >= Number(min) && itemAttr <= Number(max);
      }
      else if (compOp === '>') {
        return itemAttr > Number(val);
      }
      else if (compOp === '<') {
        return itemAttr < Number(val);
      }
      else {
        return itemAttr === Number(exact);
      }
    };
  }
  return () => true;
}


class DataFilter extends React.Component {

  state = {
    open: false
  };

  componentWillMount() {
    this._filterInputs = [];
  }

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
                <label className={styles.filterLabel}>{filter.label}</label>
                <input
                  className={styles.filterInput}
                  defaultValue={filter.value}
                  onChange={this._handleOnChangeFilter.bind(this)}
                  ref={ref => this._filterInputs[i] = ref }/>
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

  _handleOnChangeFilter() {
    const filter = (enumerable) => {
      for (const i in this.props.filters) {
        const value = this._filterInputs[i].value;
        const type = this.props.filters[i].type;
        const attr = this.props.filters[i].attr;

        if (value && type === 'match') {
          enumerable = enumerable.filter(matchFilter(attr, value));
        }
        else if (value && type === 'range') {
          enumerable = enumerable.filter(rangeFilter(attr, value));
        }
      }
      return enumerable;
    };
    return this.props.onChange(filter);
  }

}

export default DataFilter;
