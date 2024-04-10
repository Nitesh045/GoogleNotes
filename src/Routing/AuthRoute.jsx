import React from 'react'
import { Navigate } from 'react-router-dom';

export const AuthRoute = ({ children }) => {
    const localdata = localStorage.getItem('token');
    if (localdata === null || localdata === undefined) {
        return children
    }
    return <Navigate to="/" />
}
