import axios from 'axios';
import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    LOGOUT,
    SIGNUP_REQUEST,
    SIGNUP_SUCCESS,
    SIGNUP_FAILURE,
    CLEAR_AUTH_ERRORS,
    TOKEN_REFRESH_SUCCESS,
    FETCH_USER_SUCCESS,
    FETCH_USER_FAILURE,
    FETCH_USER_REQUEST
} from './authTypes';

// Base URL for your API
const API_BASE_URL = 'http://localhost:8000/api';

// Login action
export const loginUser = (credentials) => async (dispatch) => {
    dispatch({ type: LOGIN_REQUEST });

    try {
        const response = await axios.post(`${API_BASE_URL}/`, credentials, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const { access, refresh, user } = response.data;

        sessionStorage.setItem('access_token', access);
        sessionStorage.setItem('refresh_token', refresh);

        dispatch({
            type: LOGIN_SUCCESS,
            payload: {
                token: access,
                user: user, // If your API returns user data
            },
        });
    } catch (error) {
        const errorMessage = error.response?.data?.error || error.response?.data?.detail || 'Login failed';
        dispatch({
            type: LOGIN_FAILURE,
            payload: errorMessage,
        });
    }
};

// Logout action
export const logoutUser = () => (dispatch) => {
    sessionStorage.removeItem('access_token');
    sessionStorage.removeItem('refresh_token');

    dispatch({
        type: LOGOUT,
    });
};

// Signup action
export const signupUser = (userData) => async (dispatch) => {
    dispatch({ type: SIGNUP_REQUEST });

    try {
        const response = await axios.post(`${API_BASE_URL}/user`, userData, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const successAction = {
            type: SIGNUP_SUCCESS,
            payload: response.data
        };

        dispatch(successAction);
        return successAction;
    } catch (error) {
        console.log('API Error:', error.response?.data || error.message);

        const errorMessage =
            error.response?.data?.error ||
            error.response?.data?.detail ||
            'Signup failed';

        const failureAction = {
            type: SIGNUP_FAILURE,
            payload: errorMessage,
            error: true
        };

        dispatch(failureAction);
        return failureAction;
    }
};

// Fetch user profile action
export const fetchUserProfile = () => async (dispatch, getState) => {
    dispatch({ type: FETCH_USER_REQUEST });

    try {
        const token = getState().auth.token;

        const response = await axios.get(`${API_BASE_URL}/users/me/`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        });

        dispatch({
            type: FETCH_USER_SUCCESS,
            payload: response.data,
        });
    } catch (error) {
        const errorMessage = error.response?.data?.error || error.response?.data?.detail || 'Failed to fetch user profile';
        dispatch({
            type: FETCH_USER_FAILURE,
            payload: errorMessage,
        });
    }
};

// Clear auth errors action
export const clearAuthErrors = () => ({
    type: CLEAR_AUTH_ERRORS,
});

// Refresh token action
export const refreshToken = () => async (dispatch, getState) => {
    const refreshToken = getState().auth.refreshToken;

    if (!refreshToken) {
        return;
    }

    try {
        const response = await axios.post(`${API_BASE_URL}/token/refresh/`, {
            refresh: refreshToken,
        }, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const { access } = response.data;

        sessionStorage.setItem('access_token', access);

        dispatch({
            type: TOKEN_REFRESH_SUCCESS,
            payload: {
                token: access,
            },
        });
    } catch (error) {
        // If refresh fails, log the user out
        dispatch(logoutUser());
    }
};