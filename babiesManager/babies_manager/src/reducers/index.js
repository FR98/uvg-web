import { combineReducers } from 'redux';

import baby, * as babySelectors from './baby';
import event, * as eventSelectors from './event';

// Global Reducer
const reducer = combineReducers({
    baby,
    event,
});

export default reducer;

// Global Selectors

export const getBaby = (state, id) => babySelectors.getBaby(state.baby, id);

export const getBabies = state => babySelectors.getBabies(state.baby);

export const getSelectedBaby = state => babySelectors.getSelectedBaby(state.baby);

export const getEvent = (state, id) => eventSelectors.getEvent(state.event, id);

export const getEvents = (state, babyId) => eventSelectors.getEvents(state.event, babyId);