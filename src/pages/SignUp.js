import React, { useState } from 'react';
import signUpStyles from "../styles/pages/SignUp.module.css";
import { Link } from "react-router-dom";
import HomeFloatButton from "../components/HomeFloatButton/HomeFloatButton";

import EyeIcon from '../assets/icons/eye.svg';
import EyeSlashIcon from '../assets/icons/eyeSlash.svg';

export default function SignUp() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false); // For Password field
    const [showConfirmPassword, setShowConfirmPassword] = useState(false); // For Confirm Password field
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const validateEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
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
        if (value !== confirmPassword) {
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

    return (
        <div className={signUpStyles.container}>

            <HomeFloatButton />

            <h1 className={signUpStyles.h1}>Sign Up</h1>

            <div className={signUpStyles.formInputDiv}>
                <div className={signUpStyles.inputSection}>
                    <label className={signUpStyles.label} htmlFor="username">Username</label>
                    <input
                        type="text"
                        className={signUpStyles.input}
                    />
                </div>

                <div className={signUpStyles.inputSection}>
                    <label className={signUpStyles.label} htmlFor="email">Email</label>
                    <input
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
                    <label className={signUpStyles.label} htmlFor="password">Confirm Password</label>
                    <div style={{ position: 'relative' }}>
                        <input
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

                <div className={signUpStyles.buttonDiv}>
                    <button className={signUpStyles.button}>SignUp</button>
                    <Link to="/login" className={signUpStyles.button}>Go To Login</Link>
                </div>
            </div>
        </div>
    );
}