import React, { useState } from 'react';
import { connect } from 'react-redux';
import { v4 as uuid } from 'uuid';

import './styles.css';
import * as actions from '../../actions/event';

const AddEvent = ({ onClick }) => {
  const [name, changeName] = useState('');
  const [comment, changeComment] = useState('');
  return (
    <div className = 'addEvent'>
      <h2>NEW EVENT</h2>

      <select onChange = {e => changeName(e.target.value)} className = 'selectEventType'>
        {
          [
            'Siesta',
            'Pacha',
            'Pipi',
            'Popo',
            'Pecho'
          ].map(
            (eventType, index) => (
              <option value = {eventType} key = {index}>{eventType}</option>
            )
          )
        }
      </select>
      <textarea
        type = "text"
        placeholder = "Comment"
        value = {comment}
        onChange = {e => changeComment(e.target.value)}
        className = 'commentInput'
      ></textarea>
      <button
        onClick =  {() => onClick(uuid(), name, comment)}
        className = 'addEventBtn'
      >+</button>
    </div>
  );
};

export default connect(
  undefined,
  dispatch => ({
    onClick(id, name, comment) {
      dispatch(actions.addEvent(id, name, comment, new Date().toLocaleString() ));
    }
  })
)(AddEvent);