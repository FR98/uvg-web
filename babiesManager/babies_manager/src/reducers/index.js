import { combineReducers } from 'redux';

import baby from './baby';
import event from './event';

const reducer = combineReducers({
    baby,
    event,
});

export default reducer;