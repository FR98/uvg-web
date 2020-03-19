import React from 'react';
import { connect } from 'react-redux';

import './styles.css';
import * as selectors from '../../reducers';
// import * as actions from '../../actions/baby';

import Events from '../Events';

const Baby = ({ baby, state }) => {
  console.log(state);
  return (
    <div className = 'baby'>
      <Events />
    </div>
  );
};

export default connect(
  (state, { id }) => ({
    baby: selectors.getBaby(state, id),
    state: state,
  })
)(Baby);