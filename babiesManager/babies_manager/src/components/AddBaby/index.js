import React, { useState } from 'react';
import { connect } from 'react-redux';
import { v4 as uuid } from 'uuid';
import { Link } from 'react-router-dom';

import './styles.css';
import * as actions from '../../actions/baby';

const AddBaby = ({ onClick }) => {
  const [fName, changeFName] = useState('');
  const [lName, changeLName] = useState('');
  return (
    <div className = 'addBaby_sec'>
      <div className = "addBaby">
        <h1>NEW BABY</h1>
        <input
          type = "text"
          placeholder = "First Name"
          value = {fName}
          onChange = {e => changeFName(e.target.value)}
          className = 'fNameInput'
        />
        <input
          type = "text"
          placeholder = "Last Name"
          value = {lName}
          onChange = {e => changeLName(e.target.value)}
          className = 'lNameInput'
        />
        <Link 
          to='/' 
          onClick = {() => onClick(uuid(), fName, lName)}
          className = 'addBtn_link'
        >
          <button className = 'addBtn'>ADD</button>
        </Link>
      </div>
    </div>
  );
};

export default connect(
  undefined,
  dispatch => ({
    onClick(id, fName, lName) {
      dispatch(actions.addBaby(id, fName, lName));
    }
  })
)(AddBaby);
