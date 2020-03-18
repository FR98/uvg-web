import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import './styles.css';
import * as selectors from '../../reducers';

import Baby from '../Baby';
import SelectBaby from '../SelectBaby';
import AddEvent from '../AddEvent';

const Babies = ({ babyId }) => (
  <div className = 'babies'>
    <h1>The Babies Manager</h1>
    <div className = 'baby_info_sec'>
      <div className = 'title'>
        <h2>Baby:</h2>
      </div>
      <div className = 'selectBaby_sec'>
        <SelectBaby />
      </div>
      <div className='addBtn_sec'>
        <Link to = "/add">
          <button className = 'addBtn'>NEW</button>
        </Link>
      </div>
    </div>
    {
      babyId === null ? (
        <></>
      ) : (
        <div className = 'baby_sec'>
          <Baby id = {babyId}/>
          <AddEvent />
        </div>
      )
    }
  </div>
);

export default connect(
  state => ({
    // babies: selectors.getBabies(state),
    babyId: selectors.getSelectedBaby(state),
  }),
)(Babies);
