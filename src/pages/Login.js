import React, { useState } from 'react';
import loginStyles from "../styles/pages/Login.module.css";
import { Link } from "react-router-dom";
import HomeFloatButton from "../components/HomeFloatButton/HomeFloatButton";

import EyeIcon from '../assets/icons/eye.svg';
import EyeSlashIcon from '../assets/icons/eyeSlash.svg';
import signUpStyles from "../styles/pages/SignUp.module.css";

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [emailError, setEmailError] = useState('');
    const [error, setError] = useState('');

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
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateEmail(email)) {
            setEmailError('Invalid email format');
            return;
        }

        if (!password) {
            setError('Password is required');
            return;
        }

        setError('');
        setEmailError('');

    };

    return (
        <div className={loginStyles.container}>

            <HomeFloatButton />

            <h1 className={loginStyles.h1}>Login</h1>

            <form onSubmit={handleSubmit} className={loginStyles.formInputDiv}>
                <div className={loginStyles.inputSection}>
                    <label className={loginStyles.label} htmlFor="email">Email</label>
                    <input
                        type="email"
                        className={loginStyles.input}
                        value={email}
                        onChange={handleEmailChange}
                        required
                    />
                    {emailError && <div className={loginStyles.error}>{emailError}</div>}
                </div>

                <div className={loginStyles.inputSection}>
                    <label className={loginStyles.label} htmlFor="password">Password</label>
                    <div style={{ position: 'relative' }}>
                        <input
                            type={showPassword ? "text" : "password"}
                            className={loginStyles.input}
                            value={password}
                            onChange={handlePasswordChange}
                            required
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

                {/* Display general error message */}
                {error && <div className={loginStyles.error}>{error}</div>}

                <div className={loginStyles.buttonDiv}>
                    <button type="submit" className={loginStyles.button}>Login</button>
                    <Link to="/signup" className={signUpStyles.button}>Go To SignUp</Link>
                </div>
            </form>
        </div>
    );
}