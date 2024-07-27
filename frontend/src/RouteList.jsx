// Imports
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './Home';
import Login from './Login';
// import Signup from './Signup';
// import Logout from './Logout';
// import Profile from './Profile';
import NotFound from './NotFound';

/** RouteList Component
 * 
 * This component is responsible for providing the routes for the application.
 * 
 * Props: none?
 * 
 * State: none
 */
const RouteList = ({ logout, login, username }) => {
    return (
        <Routes>
            <Route path="/" element={<Home username={ username } />} />
            {/* <Route path="/login" element={<Login login={ login } />} /> */}
            {/* <Route path="/signup" element={<Signup login={ login } />} /> */}
            {/* <Route path="/profile" element={<Profile username={ username } />} /> */}
            {/* <Route path="/logout" element={<Logout logout={ logout }/>} /> */}
            <Route path="*" element={<NotFound />} />   
        </Routes>
    )
};

// Exports
export default RouteList;