import React from 'react';
import { connect } from 'react-redux';

import './styles.css';
import * as selectors from '../../reducers';
// import * as actions from '../../actions/baby';

// import Events from '../Events';

const Baby = ({ baby }) => {
  console.log(baby);
  return (
    <div className='baby'>
      <h3>
        {baby.first_name + ' ' + baby.last_name}
      </h3>
    </div>
  );
};

export default connect(
  (state, { id }) => ({
    baby: selectors.getBaby(state, id)
  })
)(Baby);