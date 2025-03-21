// src/hooks/useAuth.js

import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { fetchUserProfile } from '../store/auth/authActions';

/**
 * Custom hook to access authentication state and methods
 */
const useAuth = () => {
    const dispatch = useDispatch();
    const auth = useSelector(state => state.auth);

    // Extract relevant auth state
    const {
        isAuthenticated,
        token,
        refreshToken,
        user,
        loading,
        error
    } = auth;

    // Attempt to load user data if authenticated but no user data
    useEffect(() => {
        if (isAuthenticated && !user && !loading) {
            dispatch(fetchUserProfile());
        }
    }, [isAuthenticated, user, loading, dispatch]);

    // Get tokens from different sources
    const getAccessToken = () => token || sessionStorage.getItem('access_token');
    const getRefreshToken = () => refreshToken || sessionStorage.getItem('refresh_token');

    // Function to store user data in session storage as backup
    const storeUserLocally = (userData) => {
        if (userData) {
            sessionStorage.setItem('user_data', JSON.stringify(userData));
        }
    };

    // Store user data when it changes
    useEffect(() => {
        if (user) {
            storeUserLocally(user);
        }
    }, [user]);

    return {
        isAuthenticated,
        token: getAccessToken(),
        refreshToken: getRefreshToken(),
        user,
        loading,
        error,
        getAccessToken,
        getRefreshToken
    };
};

export default useAuth;