// Imports
import React, { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { AuthContext } from './AuthContext';

/** Logout Component
 * 
 * This component is responsible for logging the user out of the application and redirecting them to the home page.
 * 
 * Props:
 * - logout: function to log out the user
 * 
 * State: none
 */
const Logout = () => {
    const {logout } = useContext(AuthContext);
    // Navigation
    const navigate = useNavigate();

    // Effects
    useEffect(() => {
        logout();
        navigate('/', { replace: false });
    }, []);

    // Render
    return (
        <div className="Logout">
            <h1>Logging out...</h1>
        </div>
    );
};

// Exports
export default Logout;