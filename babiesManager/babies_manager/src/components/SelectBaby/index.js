import React from 'react';
import { connect } from 'react-redux';

import * as selectors from '../../reducers';

const SelectBaby = ({ state, cantidad, selectBaby }) => {
  const babies = selectors.getBabies(state);
  return (
    <div className='selectBaby'>
      <h2>Choose a baby:</h2>
      {
        cantidad === 0 ? (
          <h3>There is no baby</h3>
        ) : (
          <select onChange = {e => selectBaby(e.target.value)}>
            {
              babies.map( 
                baby => (
                  <option value={baby.id} key={baby.id}>{baby.first_name}</option>
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
    state: state,
    cantidad: selectors.getBabies(state).length,
  }),
  dispatch => ({
    selectBaby(selectedBaby) {
      console.log("Selected: ",selectedBaby)
    }
  })
)(SelectBaby);