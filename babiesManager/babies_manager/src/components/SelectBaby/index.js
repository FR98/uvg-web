import React from 'react';
import { connect } from 'react-redux';

import * as selectors from '../../reducers';
import * as actions from '../../actions/baby';

const SelectBaby = ({ babies, selectBaby }) => (
  <div className='selectBaby'>
    <h2>Choose a baby:</h2>
    {
      babies.length === 0 ? (
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

export default connect(
  state => ({
    babies: selectors.getBabies(state),
  }),
  dispatch => ({
    selectBaby(selectedBabyId) {
      dispatch(actions.selectBaby(selectedBabyId))
    }
  })
)(SelectBaby);