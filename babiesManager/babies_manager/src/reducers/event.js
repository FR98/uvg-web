import { combineReducers } from 'redux';
import * as types from '../types/event';

// Reducers

const order = (state = [], action) => {
    switch (action.type) {
        case types.EVENT_ADDED: {
            return [...state, action.payload.id];
        }
        case types.EVENT_DELETED: {
            return [...state].pop(action.payload);
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
            const newState = {...state};
            delete newState.action.payload.id;
            return newState;
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

export const getEvents = state => state.order.map(
    id => getEvent(state, id),
).filter(event => event != null);