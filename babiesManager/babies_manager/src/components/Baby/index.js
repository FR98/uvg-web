import React from 'react';
import { connect } from 'react-redux';

import './styles.css';
import * as selectors from '../../reducers';
import * as actions from '../../actions/baby';

const Baby = ({name}) => (
    <div className='baby'>
        {name}
    </div>
);

export default connect(
    (state, { id }) => ({
        name: selectors.getBaby(state, id)
    })
)(Baby);