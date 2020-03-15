import * as types from '../types/baby';

export const addBaby = (id, first_name, last_name) => ({
    type: types.BABY_ADDED,
    payload: { id, first_name, last_name },
});

export const selectBaby = id => ({
    type: types.BABY_SELECTED,
    payload: id
});