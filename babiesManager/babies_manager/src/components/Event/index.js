import React from 'react';
import { connect } from 'react-redux';

import './styles.css';
import * as selectors from '../../reducers';

const Event = ({ event }) => {
  return (
    <div className = 'event'>
      <h4>{event.name + " --- " + event.date_time}</h4>
      <p>{event.comment}</p>
    </div>
  );
};

export default connect(
  (state, { id }) => ({
    event: selectors.getEvent(state, id)
  })
)(Event);