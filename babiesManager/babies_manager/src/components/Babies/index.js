import React from 'react';
import { connect } from 'react-redux';

import './styles.css';
import * as selectors from '../../reducers';
import * as actions from '../../actions/baby';

import Baby from '../Baby';

import SelectBaby from '../SelectBaby';

const Babies = ({ cantidad, newBaby }) => (
  <div className='babies'>
    <h1>The Babies Manager</h1>
    <SelectBaby />
    <button 
      type='button'
      onClick = {() => newBaby()}
    >+</button>
    
  </div>
);

export default connect(
  state => ({
    cantidad: selectors.getBabies(state).length,
  }),
  dispatch => ({
    newBaby() {
      console.log("New baby screen")
    }
  })
)(Babies);
