import React, { useState } from 'react';
import { connect } from 'react-redux';
import { v4 as uuid } from 'uuid';
import { Link } from 'react-router-dom';

// import './styles.css';
import * as actions from '../../actions/baby';

const AddBaby = ({ onClick }) => {
  const [fName, changeFName] = useState('');
  const [lName, changeLName] = useState('');
  return (
    <div className='addBaby'>
      <h1>Add a new Baby</h1>
      <input
        type="text"
        placeholder="First Name"
        value={fName}
        onChange={e => changeFName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Last Name"
        value={lName}
        onChange={e => changeLName(e.target.value)}
      />
      <Link 
        to='/' 
        onClick = {() => onClick(uuid(), fName, lName)}
      >Add</Link>
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
