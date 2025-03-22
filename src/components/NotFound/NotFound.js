import React from 'react';
import { Link } from 'react-router-dom';
import notFoundStyles from './NotFound.module.css';

export default function NotFound(){
    return (
        <div className={notFoundStyles.container}>
            <h1 className={notFoundStyles.h1} >404</h1>
            <h2 className={notFoundStyles.h2}>Page Not Found</h2>
            <p className={notFoundStyles.p} >The page you are looking for doesn't exist or has been moved.</p>
            <Link to="/" className={notFoundStyles.button}>
                Go Home
            </Link>
        </div>
    );
};
