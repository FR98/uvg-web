import React from 'react';
import { connect } from 'react-redux';
// import { Link } from 'react-router-dom';

import './styles.css';
import * as selectors from '../../reducers';
// import * as actions from '../../actions/baby';

import AddEvent from '../AddEvent';
import Event from '../Event';

const Events = ({ babyId, events }) => (
  <div className='events'>
    <h2>Events</h2>
    {
      events.map(
        (event) => (
          <Event id={event.id} key={event.id}/>
        )
      )
    }
    <AddEvent />
  </div>
);

export default connect(
  state => ({
    babyId: selectors.getSelectedBaby(state),
    events: selectors.getEvents(state),
  }),
)(Events);
