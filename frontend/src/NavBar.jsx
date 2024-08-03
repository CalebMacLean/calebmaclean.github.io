// Imports
import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';

import { AuthContext } from './AuthContext';
import "./NavBar.css";
/** NavBar Component
 * 
 * This component is responsible for rendering the navigation bar. It provides links to the home page, companies page, jobs page, and the user's profile page. It also provides a login and signup link if the user is not logged in, and a logout link if the user is logged in.
 * 
 * Props:
 * - user: object like { username, first_name, last_name, email, avatar, num_pomodoros, is_admin }
 * 
 * State: none
 */
const NavBar = () => {
    const { username } = useContext(AuthContext);
    // create var to check if a user is logged in
    const isLoggedIn = username ? true : false;
    // console.log("NavBar isLoggedIn:", isLoggedIn);

    // Render
    return (
        <nav className='navbar navbar-expand-lg bg-body-tertiary'>
            <div className="navbar-container container-fluid">
                <div className="navbar-left">
                <button
                    className="navbar-toggler"
                    type='button'
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent"
                    aria-controls='navbarSupportedContent'
                    aria-expand='false'
                    aria-label='Toggle navigation'
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                </div>
                <NavLink to="/" className="navbar-brand">Pomodoro Clock</NavLink>
                <div className="collapse navbar-collapse" id='navbarSupportedContent'>
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        {isLoggedIn ? (
                            <>
                                <li className="nav-item">
                                    <NavLink to="/profile" className="nav-link">Profile</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink to="/users" className="nav-link">Users</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink to="/lists" className="nav-link">Lists</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink to="/logout" className="nav-link">Logout</NavLink>
                                </li>
                            </>
                        ) : (
                            <>
                                <li className="nav-item">
                                    <NavLink to="/login" className="nav-link">Login</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink to="/signup" className="nav-link">Signup</NavLink>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </nav>

        // <header className='header'>
        //     <div className='header-content'>

        //             <h2>Pomodoro Clock</h2>
        //         <nav className='NavBar'>
        //             {isLoggedIn ? (
        //                 <div>
        //                     <NavLink to="/">Home</NavLink>
        //                     <NavLink to="/profile">Profile</NavLink>
        //                     <NavLink to="/users">Users</NavLink>
        //                     <NavLink to="/lists">Lists</NavLink>
        //                     <NavLink to="/logout">Logout</NavLink>
        //                 </div>
        //             ) : (
        //                 <div>
        //                     <NavLink to="/">Home</NavLink>
        //                     <NavLink to="/login">Login</NavLink>
        //                     <NavLink to="/signup">Signup</NavLink>
        //                 </div>
        //             )}
        //         </nav>
        //     </div>
        // </header>
    )
}

// Exports
export default NavBar;