import * as types from '../types/event';

export const addEvent = (id, name, comment, date_time) => ({
    type: types.EVENT_ADDED,
    payload: { id, name, comment, date_time },
});

export const deleteEvent = id => ({
    type: types.EVENT_DELETED,
    payload: id
});