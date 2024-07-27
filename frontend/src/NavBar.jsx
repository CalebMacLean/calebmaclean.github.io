// Imports
import React from 'react';
import { NavLink } from 'react-router-dom';
import './NavBar.css';

/** NavBar Component
 * 
 * This component is responsible for rendering the navigation bar. It provides links to the home page, companies page, jobs page, and the user's profile page. It also provides a login and signup link if the user is not logged in, and a logout link if the user is logged in.
 * 
 * Props:
 * - user: object like { username, first_name, last_name, email, avatar, numPomodoros, isAdmin }
 * 
 * State: none
 */
const NavBar = ({ username }) => {
    // render the navigation bar
    const isLoggedIn = username ? true : false;
    // console.log('isLoggedIn:', isLoggedIn);
    return (
        <nav className="NavBar">
            <NavLink to="/">Pomodoro Clock</NavLink>
            {isLoggedIn ? (
                <div>
                    <NavLink to="/profile">Profile</NavLink>
                    <NavLink to="/logout">Logout</NavLink>
                </div>
            ) : (
                <div>
                    <NavLink to="/login">Login</NavLink>
                    <NavLink to="/signup">Signup</NavLink>
                </div>
            )}
        </nav>
    )
};

// Exports
export default NavBar;