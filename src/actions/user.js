import { setAuthToken } from "../utils/setAuthToken"
import { AUTH_SUCCESS, AUTH_FAIL, USER_SUCCESS, SET_ERRORS } from "./types"
import axios from "axios"

export const load = () => async dispatch => {
    if (localStorage.token) {
        setAuthToken(localStorage.token)
    }

    try {
        const res = await axios.get('https://blog-backend-21.herokuapp.com/api/users/auth')
        dispatch({
            type: USER_SUCCESS,
            payload: res.data
        })
    } catch (error) {
        dispatch({
            type: AUTH_FAIL
        })
    }
}

export const login = ({ email, password }) => async dispatch => {
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    }

    const body = JSON.stringify({ email, password })

    try {
        const res = await axios.post("https://blog-backend-21.herokuapp.com/api/users/login", body, config)

        dispatch({
            type: AUTH_SUCCESS,
            payload: res.data
        })
    } catch (error) {
        dispatch({
            type: AUTH_FAIL
        })
        const errors = error.response.data.result
        dispatch({
            type: SET_ERRORS,
            payload: errors
        })
    }
}

export const register = ({ name, email, password }) => async dispatch => {
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    }

    const body = JSON.stringify({ name, email, password })

    try {
        const res = await axios.post("https://blog-backend-21.herokuapp.com/api/users/register", body, config)

        dispatch({
            type: AUTH_SUCCESS,
            payload: res.data
        })
    } catch (error) {
        dispatch({
            type: AUTH_FAIL
        })
        const errors = error.response.data.result
        dispatch({
            type: SET_ERRORS,
            payload: errors
        })
    }
}

export const logout = () => dispatch => {
    dispatch({ type: AUTH_FAIL })
}