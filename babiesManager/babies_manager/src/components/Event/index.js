import React from 'react';
import { connect } from 'react-redux';

import './styles.css';
import * as selectors from '../../reducers';
import * as actions from '../../actions/event';

const Event = ({ event, onClick }) => {
  return (
    <div className = 'event'>
      <div className = 'event_info'>
        <h4>{event.name + " --- " + event.date_time}</h4>
        <p>{event.comment}</p>
      </div>
      <button
        onClick = {() => onClick(event)}
        className = 'deleteEventBtn'
      >
        X
      </button>
    </div>
  );
};

export default connect(
  (state, { id }) => ({
    event: selectors.getEvent(state, id)
  }),
  dispatch => ({
    onClick(event){
      dispatch(actions.deleteEvent(event));
    }
  })
)(Event);