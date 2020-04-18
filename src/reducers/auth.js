import { AUTH_SUCCESS, AUTH_FAIL, USER_SUCCESS, SET_ERRORS } from '../actions/types'

const initialState = {
    token: localStorage.getItem('token'),
    loading: true,
    isAuthenticated: null,
    user: null,
    errors: []
}

export default (state = initialState, action) => {
    const { type, payload } = action
    switch (type) {
        case USER_SUCCESS:
            return {
                ...state,
                isAuthenticated: true,
                loading: false,
                user: payload
            }
        case AUTH_SUCCESS:
            localStorage.setItem('token', payload.token)
            return {
                ...state,
                token: payload.token,
                loading: false,
                isAuthenticated: true
            }
        case AUTH_FAIL: 
            localStorage.removeItem('token')
            return {
                ...state,
                token: null,
                loading: false,
                isAuthenticated: false,
                user: null
            }
        case SET_ERRORS:
            return {
                ...state,
                errors: payload
            }
        default:
            return state
    }
}