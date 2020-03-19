import * as types from '../types/event';

export const addEvent = (id, name, comment, date_time, baby_id) => ({
    type: types.EVENT_ADDED,
    payload: { id, name, comment, date_time, baby_id },
});

export const deleteEvent = event => ({
    type: types.EVENT_DELETED,
    payload: { event: event }
});