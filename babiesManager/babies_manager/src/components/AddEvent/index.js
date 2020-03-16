import React, { useState } from 'react';
import { connect } from 'react-redux';
import { v4 as uuid } from 'uuid';

import './styles.css';
import * as actions from '../../actions/event';

const AddEvent = ({ onClick }) => {
  const [name, changeName] = useState('');
  const [comment, changeComment] = useState('');
  return (
    <div className='addEvent'>
      <h1>New Event</h1>

      <select onChange = {e => changeName(e.target.value)}>
        {
          [
            'Siesta',
            'Pacha',
            'Pipi',
            'Popo',
            'Pecho'
          ].map(
            (eventType, index) => (
              <option value={eventType} key={index}>{eventType}</option>
            )
          )
        }
      </select>

      <input
        type="text"
        placeholder="Comment"
        value={comment}
        onChange={e => changeComment(e.target.value)}
      />
      <button
        onClick =  {() => onClick(uuid(), name, comment)}
      >Add</button>
    </div>
  );
};

export default connect(
  undefined,
  dispatch => ({
    onClick(id, name, comment) {
      dispatch(actions.addEvent(id, name, comment));
    }
  })
)(AddEvent);
