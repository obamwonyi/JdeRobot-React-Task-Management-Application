// src/utils/api.js
import store from '../store';
import { refreshToken, logoutUser } from '../store/auth/authActions';

export const apiRequest = async (url, options = {}) => {
    const state = store.getState();
    const token = state.auth.token;

    const headers = {
        'Content-Type': 'application/json',
        ...options.headers
    };

    // Add authorization header if token exists
    if (token) {
        headers.Authorization = `Bearer ${token}`;
    }

    try {
        const response = await fetch(url, {
            ...options,
            headers
        });

        if (response.status === 401) {
            // Try to refresh the token
            await store.dispatch(refreshToken());

            const newState = store.getState();
            if (newState.auth.token) {
                headers.Authorization = `Bearer ${newState.auth.token}`;
                return fetch(url, {
                    ...options,
                    headers
                });
            } else {
                store.dispatch(logoutUser());
                throw new Error('Session expired. Please login again.');
            }
        }

        return response;
    } catch (error) {
        console.error('API request failed:', error);
        throw error;
    }
};