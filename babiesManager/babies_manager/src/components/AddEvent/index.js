import React, { useState } from 'react';
import { connect } from 'react-redux';
import { v4 as uuid } from 'uuid';

import './styles.css';
import * as actions from '../../actions/event';
import * as selectors from '../../reducers';

const AddEvent = ({ state, onClick }) => {
  const babyId = selectors.getSelectedBaby(state);
  const [name, changeName] = useState('');
  const [comment, changeComment] = useState('');
  return (
    <div className = 'addEvent'>
      <h2>NEW EVENT</h2>

      <select onChange = {e => changeName(e.target.value)} className = 'selectEventType'>
        {
          name === '' ? (
            <option value = {null} key = {null}>Select a Event</option> 
          ) : (<></>)
        }
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
        onClick =  {() => onClick(uuid(), name, comment, babyId)}
        className = 'addEventBtn'
      >+</button>
    </div>
  );
};

export default connect(
  state => ({
    state: state,
  }),
  dispatch => ({
    onClick(id, name, comment, babyId) {
      dispatch(actions.addEvent(id, name, comment, new Date().toLocaleString(), babyId ));
    }
  })
)(AddEvent);