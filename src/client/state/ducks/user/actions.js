import * as types from './types'

export const fetchUsers = () => async (dispatch, getState, api) => {
    const res = await api.get('/users');

    dispatch({
        type: types.FETCH_USERS,
        payload: res
    });
};