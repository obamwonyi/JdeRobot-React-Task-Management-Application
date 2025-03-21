import {
    SIGNUP_REQUEST,
    SIGNUP_SUCCESS,
    SIGNUP_FAILURE,
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    LOGOUT,
    CLEAR_AUTH_ERRORS,
    FETCH_USER_REQUEST,
    FETCH_USER_SUCCESS,
    FETCH_USER_FAILURE
} from './authTypes';

const initialState = {
    token: sessionStorage.getItem('access_token'),
    refreshToken: sessionStorage.getItem('refresh_token'),
    isAuthenticated: !!sessionStorage.getItem('access_token'),
    user: null,
    loading: false,
    error: null
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SIGNUP_REQUEST:
        case LOGIN_REQUEST:
        case FETCH_USER_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            };
        case SIGNUP_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null
            };
        case LOGIN_SUCCESS:
            return {
                ...state,
                loading: false,
                isAuthenticated: true,
                token: action.payload.token,
                refreshToken: action.payload.refreshToken,
                user: action.payload.user,
                error: null
            };
        case FETCH_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                user: action.payload,
                error: null
            };
        case SIGNUP_FAILURE:
        case LOGIN_FAILURE:
        case FETCH_USER_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        case LOGOUT:
            return {
                ...state,
                isAuthenticated: false,
                token: null,
                refreshToken: null,
                user: null
            };
        case CLEAR_AUTH_ERRORS:
            return {
                ...state,
                error: null
            };
        default:
            return state;
    }
};

export default authReducer;