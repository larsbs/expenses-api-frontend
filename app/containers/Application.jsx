import React from 'react';
import { connect } from 'react-redux';

import DataTable from '../components/DataTable';


const Application = () => (
  <div>
    <h1>Expensation</h1>
    <DataTable />
  </div>
);


export default connect()(Application);
