import axios from "../helpers/axios"
import { authConstants, cartConstants } from "./constants"

export const register = (data) => async (dispatch) => {
    dispatch({ type: authConstants.SIGNUP_REQUEST });
    const res = await axios.post('/signup', data);
    if (res.status === 201) {
        dispatch({ type: authConstants.SIGNUP_SUCCESS });
        const { token, user } = res.data;
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
        dispatch({
            type: authConstants.LOGIN_SUCCESS,
            payload: { token, user }
        });
    }
    else {
        dispatch({
            type: authConstants.SIGNUP_FAILURE
        })
    }
}

export const login = (user) => async (dispatch) => {
    dispatch({ type: authConstants.LOGIN_REQUEST });

    try {
        const res = await axios.post('/signin', {
            ...user
        });
        if (res.status === 200) {
            // console.log(res.data);
            const { token, user } = res.data;
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(user));
            dispatch({
                type: authConstants.LOGIN_SUCCESS,
                payload: { token, user }
            });
        }
    } catch (error) {
        dispatch({
            type: authConstants.LOGIN_FAILURE,
        })
    }
}

export const isUserLogin = () => async (dispatch) => {
    const token = localStorage.getItem('token');
    if (token) {
        const user = JSON.parse(localStorage.getItem('user'));
        dispatch({
            type: authConstants.LOGIN_SUCCESS,
            payload: { token, user }
        });
    } else {
        dispatch({
            type: authConstants.LOGIN_FAILURE,
            payload: {
                error: "Failed to Login"
            }
        })
    }
}

export const signout = () => async (dispatch) => {
    dispatch({ type: authConstants.LOGOUT_REQUEST });
    // localStorage.removeItem('user');
    // localStorage.removeItem('token');
    localStorage.clear();
    dispatch({ type: authConstants.LOGOUT_SUCCESS });
    dispatch({ type: cartConstants.RESET_CART });

    // const res = await axios.post('/signout');

    // if (res.status === 200) {

    // } else {
    //     dispatch({
    //         type: authConstants.LOGOUT_FAILURE,
    //         payload: { error: res.status.error }
    //     })
    // }
}

