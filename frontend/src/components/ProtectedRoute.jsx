import React from "react";
import {Navigate} from 'react-router-dom';

// check if authenticated
const isAuthenticated = () => {
    // login and register functionality
    return !!localStorage.getItem('token');
    // return true;
}

const ProtectedRoute = ({children}) => {
    if(!isAuthenticated()){
        return <Navigate to="/login" replace />
    }

    return children
}

export default ProtectedRoute;