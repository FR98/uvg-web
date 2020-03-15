import React, { useState } from 'react';
import { connect } from 'react-redux';

import * as selectors from '../../reducers';
import range from 'lodash/range';

const SelectBaby = ({ cantidad, selectBaby }) => {
  return (
    <div className='selectBaby'>
      <h2>Choose a baby:</h2>
      {
        cantidad === 0 ? (
          <h3>There is no baby</h3>
        ) : (
          <select onChange = {e => selectBaby(e.target.value)}>
            {
              range(cantidad).map(
                id => (
                  <option value={id}>{selectors.getBaby(id)}</option>
                )
              )
            }
          </select>
        )
      }
    </div>
  );
};

export default connect(
  state => ({
    cantidad: selectors.getBabies(state).length,
  }),
  dispatch => ({
    selectBaby(selectedBaby) {
      console.log(selectedBaby)
    }
  })
)(SelectBaby);