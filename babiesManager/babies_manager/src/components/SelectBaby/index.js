import React from 'react';
import { connect } from 'react-redux';

import './styles.css';
import * as selectors from '../../reducers';
import * as actions from '../../actions/baby';

const SelectBaby = ({ babies, selectedBaby, selectBaby }) => (
  <div className='selectBaby'>
    {
      babies.length === 0 ? (
        <h3>There is no baby</h3>
      ) : (
        <select onChange = {e => selectBaby(e.target.value)} className = 'select'>
          {
            selectedBaby === null ? (
              <option value = {null} key = {null}>Select a Baby</option> 
            ) : (<></>)
          }
          {
            babies.map( 
              baby => (
                <option value = {baby.id} key = {baby.id}>{baby.first_name + ' ' + baby.last_name}</option>
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
    selectedBaby: selectors.getSelectedBaby(state),
  }),
  dispatch => ({
    selectBaby(selectedBabyId) {
      dispatch(actions.selectBaby(selectedBabyId))
    }
  })
)(SelectBaby);