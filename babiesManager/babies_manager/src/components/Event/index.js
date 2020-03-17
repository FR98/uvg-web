import React from 'react';
import { connect } from 'react-redux';

import './styles.css';
import * as selectors from '../../reducers';

const Event = ({ event }) => {
  return (
    <div className='event'>
      <h4>
        {event.name + '\n' + event.comment + '\n' + event.date_time}
      </h4>
    </div>
  );
};

export default connect(
  (state, { id }) => ({
    event: selectors.getEvent(state, id)
  })
)(Event);