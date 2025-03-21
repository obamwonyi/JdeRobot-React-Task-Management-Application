// src/components/InitializeAuth.js
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { refreshToken } from '../store/auth/authActions';

const InitializeAuth = ({ children }) => {
    const dispatch = useDispatch();

    useEffect(() => {
        // Check if there's a token in storage and refresh it
        if (sessionStorage.getItem('refresh_token')) {
            dispatch(refreshToken());
        }

        // Set up a timer to refresh token periodically (e.g., every 10 minutes)
        const intervalId = setInterval(() => {
            if (sessionStorage.getItem('refresh_token')) {
                dispatch(refreshToken());
            }
        }, 10 * 60 * 1000);

        return () => clearInterval(intervalId);
    }, [dispatch]);

    return children;
};

export default InitializeAuth;