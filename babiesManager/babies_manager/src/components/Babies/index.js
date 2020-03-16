import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import './styles.css';
import * as selectors from '../../reducers';
// import * as actions from '../../actions/baby';

// import Baby from '../Baby';

import SelectBaby from '../SelectBaby';

const Babies = ({ cantidad, newBaby }) => (
  <div className='babies'>
    <h1>The Babies Manager</h1>
    <SelectBaby />
    <Link to="/add">Add</Link>
  </div>
);

export default connect(
  state => ({
    cantidad: selectors.getBabies(state).length,
  }),
)(Babies);
