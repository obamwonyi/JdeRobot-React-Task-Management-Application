import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import signUpStyles from "../styles/pages/SignUp.module.css";
import HomeFloatButton from "../components/HomeFloatButton/HomeFloatButton";
import EyeIcon from '../assets/icons/eye.svg';
import EyeSlashIcon from '../assets/icons/eyeSlash.svg';
import { signupUser } from '../store/auth/authActions';
import { SIGNUP_SUCCESS } from '../store/auth/authTypes';

export default function SignUp() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { loading, error } = useSelector(state => state.auth);

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [usernameError, setUsernameError] = useState('');
    const [submitError, setSubmitError] = useState(''); // Add this line

    const validateEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    const handleUsernameChange = (e) => {
        const value = e.target.value;
        setUsername(value);
        if (value.length < 3) {
            setUsernameError('Username must be at least 3 characters');
        } else {
            setUsernameError('');
        }
    };

    const handleEmailChange = (e) => {
        const value = e.target.value;
        setEmail(value);
        if (!validateEmail(value)) {
            setEmailError('Invalid email format');
        } else {
            setEmailError('');
        }
    };

    const handlePasswordChange = (e) => {
        const value = e.target.value;
        setPassword(value);
        if (confirmPassword && value !== confirmPassword) {
            setPasswordError('Passwords do not match');
        } else {
            setPasswordError('');
        }
    };

    const handleConfirmPasswordChange = (e) => {
        const value = e.target.value;
        setConfirmPassword(value);
        if (value !== password) {
            setPasswordError('Passwords do not match');
        } else {
            setPasswordError('');
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    const validateForm = () => {
        let isValid = true;

        if (!username || username.length < 3) {
            setUsernameError('Username must be at least 3 characters');
            isValid = false;
        }

        if (!email || !validateEmail(email)) {
            setEmailError('Invalid email format');
            isValid = false;
        }

        if (!password || password.length < 6) {
            setPasswordError('Password must be at least 6 characters');
            isValid = false;
        }

        if (password !== confirmPassword) {
            setPasswordError('Passwords do not match');
            isValid = false;
        }

        return isValid;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        const userData = { username, email, password };

        dispatch(signupUser(userData))
            .then((action) => {
                // Check if the action type indicates success
                if (!action.error && action.type === SIGNUP_SUCCESS) {
                    // On successful signup, redirect to login
                    navigate('/login');
                } else if (action.payload) {
                    // Handle specific errors based on error message content
                    const errorMsg = action.payload;
                    if (typeof errorMsg === 'string') {
                        if (errorMsg.includes('email already exists')) {
                            setEmailError(errorMsg);
                        } else if (errorMsg.includes('username already exists')) {
                            setUsernameError(errorMsg);
                        } else {
                            setSubmitError(errorMsg);
                        }
                    } else {
                        setSubmitError('Signup failed. Please try again.');
                    }
                }
            })
            .catch((error) => {
                console.error('Signup error:', error);
                setSubmitError('An unexpected error occurred. Please try again.');
            });
    };

    return (
        <div className={signUpStyles.container}>
            <HomeFloatButton />
            <h1 className={signUpStyles.h1}>Sign Up</h1>

            <form onSubmit={handleSubmit} className={signUpStyles.formInputDiv}>
                <div className={signUpStyles.inputSection}>
                    <label className={signUpStyles.label} htmlFor="username">Username</label>
                    <input
                        id="username"
                        type="text"
                        className={signUpStyles.input}
                        value={username}
                        onChange={handleUsernameChange}
                    />
                    {usernameError && <span className={signUpStyles.error}>{usernameError}</span>}
                </div>

                <div className={signUpStyles.inputSection}>
                    <label className={signUpStyles.label} htmlFor="email">Email</label>
                    <input
                        id="email"
                        type="email"
                        className={signUpStyles.input}
                        value={email}
                        onChange={handleEmailChange}
                    />
                    {emailError && <span className={signUpStyles.error}>{emailError}</span>}
                </div>

                <div className={signUpStyles.inputSection}>
                    <label className={signUpStyles.label} htmlFor="password">Password</label>
                    <div style={{ position: 'relative' }}>
                        <input
                            id="password"
                            type={showPassword ? "text" : "password"}
                            className={signUpStyles.input}
                            value={password}
                            onChange={handlePasswordChange}
                        />
                        <span
                            style={{
                                position: 'absolute',
                                right: '10px',
                                top: '50%',
                                transform: 'translateY(-50%)',
                                cursor: 'pointer',
                            }}
                            onClick={togglePasswordVisibility}
                        >
                            <img
                                src={showPassword ? EyeSlashIcon : EyeIcon}
                                alt="Toggle Password Visibility"
                                style={{ width: '20px', height: '20px' }}
                            />
                        </span>
                    </div>
                </div>

                <div className={signUpStyles.inputSection}>
                    <label className={signUpStyles.label} htmlFor="confirmPassword">Confirm Password</label>
                    <div style={{ position: 'relative' }}>
                        <input
                            id="confirmPassword"
                            type={showConfirmPassword ? "text" : "password"}
                            className={signUpStyles.input}
                            value={confirmPassword}
                            onChange={handleConfirmPasswordChange}
                        />
                        <span
                            style={{
                                position: 'absolute',
                                right: '10px',
                                top: '50%',
                                transform: 'translateY(-50%)',
                                cursor: 'pointer',
                            }}
                            onClick={toggleConfirmPasswordVisibility}
                        >
                            <img
                                src={showConfirmPassword ? EyeSlashIcon : EyeIcon}
                                alt="Toggle Confirm Password Visibility"
                                style={{ width: '20px', height: '20px' }}
                            />
                        </span>
                    </div>
                    {passwordError && <span className={signUpStyles.error}>{passwordError}</span>}
                </div>

                {submitError && <div className={signUpStyles.error}>{submitError}</div>} {/* Display submitError */}
                {error && <div className={signUpStyles.error}>{error}</div>}

                <div className={signUpStyles.buttonDiv}>
                    <button
                        type="submit"
                        className={signUpStyles.button}
                        disabled={loading}
                    >
                        {loading ? 'Signing Up...' : 'Sign Up'}
                    </button>
                    <Link to="/login" className={signUpStyles.button}>Go To Login</Link>
                </div>
            </form>
        </div>
    );
}