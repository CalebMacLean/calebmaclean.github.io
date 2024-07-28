// Imports
import React from 'react';
import { Route, Routes } from 'react-router-dom';

import Home from './Home';
import NotFound from './NotFound';
import LogIn from './LogIn';
import Logout from './Logout';
import Signup from './Signup';
import Profile from './Profile';

/** RouteList Component
 * 
 * This component is responsible for providing the routes for the application.
 * 
 * Props: none
 * 
 * State: none
 */
const RouterList = ({ username, login, logout }) => {
    return (
        <Routes>
            {/* Home Page */}
            <Route path="/" element={<Home username={ username } />} />
            {/* Log In Form */}
            <Route path="/login" element={<LogIn login={ login } />} />
            {/* Log Out Feature */}
            <Route path="/logout" element={<Logout logout={ logout } />} />
            {/* Sign Up Form */}
            <Route path="/signup" element={<Signup login={ login } />} />
            {/* Profile Page */}
            <Route path="/profile" element={<Profile username={ username } />} />
            {/* Not Found Page */}
            <Route path='*' element={<NotFound />} />
        </Routes>
    )
};

// Exports
export default RouterList;