import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import './styles.css';
import * as selectors from '../../reducers';
// import * as actions from '../../actions/baby';

import Baby from '../Baby';
import SelectBaby from '../SelectBaby';
import AddEvent from '../AddEvent';

const Babies = ({ babyId }) => (
  <div className='babies'>
    <h1>The Babies Manager</h1>
    <SelectBaby />
    <Link to="/add">Add</Link>
    {
      babyId === null ? (
        <></>
      ) : (
        <>
        <Baby id={babyId}/>
        <AddEvent />
        </>
      )
    }
  </div>
);

export default connect(
  state => ({
    babies: selectors.getBabies(state),
    babyId: selectors.getSelectedBaby(state),
  }),
)(Babies);
