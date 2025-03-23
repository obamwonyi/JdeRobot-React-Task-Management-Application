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
        const response = await axios.post(`${API_BASE_URL}/token/`, credentials, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const { access, refresh, user } = response.data;

        // Store tokens in sessionStorage
        sessionStorage.setItem('access_token', access);
        sessionStorage.setItem('refresh_token', refresh);

        dispatch({
            type: LOGIN_SUCCESS,
            payload: {
                token: access,
                refreshToken: refresh, // Make sure this matches your reducer
                user: user,
            },
        });

        return { success: true };
    } catch (error) {
        const errorMessage = error.response?.data?.error || error.response?.data?.detail || 'Login failed';
        dispatch({
            type: LOGIN_FAILURE,
            payload: errorMessage,
        });
        return { success: false, error: errorMessage };
    }
};

// Logout action
export const logoutUser = () => (dispatch) => {
    sessionStorage.removeItem('access_token');
    sessionStorage.removeItem('refresh_token');
    sessionStorage.removeItem('user_data');

    dispatch({
        type: LOGOUT,
    });
};

// Signup action
export const signupUser = (userData) => async (dispatch) => {
    dispatch({ type: SIGNUP_REQUEST });

    try {
        const response = await axios.post(`${API_BASE_URL}/user/`, userData, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const successAction = {
            type: SIGNUP_SUCCESS,
            payload: response.data,
        };

        dispatch(successAction);
        return successAction;
    } catch (error) {

        const errorMessage =
            error.response?.data?.email?.[0] ||
            error.response?.data?.error ||
            error.response?.data?.detail ||
            'Signup failed';

        const failureAction = {
            type: SIGNUP_FAILURE,
            payload: errorMessage,
            error: true,
        };

        dispatch(failureAction);
        return failureAction;
    }
};

// Fetch user profile action - UPDATED with correct endpoint
export const fetchUserProfile = () => async (dispatch, getState) => {
    dispatch({ type: FETCH_USER_REQUEST });

    try {
        const token = getState().auth.token || sessionStorage.getItem('access_token');

        if (!token) {
            throw new Error('No authentication token found');
        }

        // Using the correct endpoint from your API docs
        const response = await axios.get(`${API_BASE_URL}/user/me/`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        });

        // Store user data in session storage as backup
        sessionStorage.setItem('user_data', JSON.stringify(response.data));

        dispatch({
            type: FETCH_USER_SUCCESS,
            payload: response.data,
        });

        return response.data;
    } catch (error) {
        const errorMessage = error.response?.data?.error || error.response?.data?.detail || 'Failed to fetch user profile';
        dispatch({
            type: FETCH_USER_FAILURE,
            payload: errorMessage,
        });

        // Try to recover user data from session storage if available
        const cachedUser = sessionStorage.getItem('user_data');
        if (cachedUser) {
            try {
                const userData = JSON.parse(cachedUser);
                dispatch({
                    type: FETCH_USER_SUCCESS,
                    payload: userData,
                });
                return userData;
            } catch (e) {
                // removed the error for cleanup
            }
        }

        throw error;
    }
};

// Clear auth errors action
export const clearAuthErrors = () => ({
    type: CLEAR_AUTH_ERRORS,
});

// Refresh token action
export const refreshToken = () => async (dispatch, getState) => {
    const refreshToken = getState().auth.refreshToken || sessionStorage.getItem('refresh_token');

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

        return access;
    } catch (error) {
        // If refresh fails, log the user out
        dispatch(logoutUser());
        throw error;
    }
};