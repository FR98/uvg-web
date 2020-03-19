import { combineReducers } from 'redux';
import * as types from '../types/event';
import omit from 'lodash/omit';
import remove from 'lodash/remove';


// Reducers

const order = (state = [], action) => {
    switch (action.type) {
        case types.EVENT_ADDED: {
            return [...state, action.payload.id];
        }
        case types.EVENT_DELETED: {
            console.log(state);
            console.log(action.payload);
            console.log(action.payload.event);
            console.log(remove(state, action.payload));
            console.log(remove(state, [action.payload]));
            console.log(remove(state, action.payload.event));
            console.log(remove(state, [action.payload.event]));
            console.log(remove(state, action.payload.event.id));
            console.log(remove(state, [action.payload.event.id]));
            console.log(state);
            return remove(state, action.payload.event.id);
        }
        default: return state;
    }
};

const byId = (state = {}, action) => {
    switch (action.type) {
        case types.EVENT_ADDED: {
            return {
                ...state,
                [action.payload.id]: action.payload,
            };
        }
        case types.EVENT_DELETED: {
            return omit(state, action.payload.id);
        }
        default: return state;
    }
};

const event = combineReducers({
    byId,
    order,
});

export default event;

// Selectors

export const getEvent = (state, id) => state.byId[id];

export const getEvents = (state, babyId) => state.order.map(
    id => getEvent(state, id),
).filter(event => event != null && event.baby_id === babyId);