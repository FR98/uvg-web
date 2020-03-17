import React from 'react';
import { connect } from 'react-redux';

import './styles.css';
import * as selectors from '../../reducers';
// import * as actions from '../../actions/baby';

// import Events from '../Events';

const Baby = ({ baby, state }) => {
  console.log(baby);
  console.log(state);
  return (
    <div className='baby'>
      <h2>
        {baby.first_name + ' ' + baby.last_name}
      </h2>
    </div>
  );
};

export default connect(
  (state, { id }) => ({
    baby: selectors.getBaby(state, id),
    state: state,
  })
)(Baby);