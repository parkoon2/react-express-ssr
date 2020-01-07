import * as types from './types'

export default (state = [], action) => {

    switch (action.type) {
        case types.FETCH_USERS:
            return action.payload.data

        default:
            return state
    }
}