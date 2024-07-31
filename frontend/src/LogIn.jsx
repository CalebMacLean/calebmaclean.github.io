// Imports
import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import PomodoroAPI from './PomodoroAPI';
import { AuthContext } from './AuthContext';

/** LogIn Component
 * 
 * This component is responsible for rendering the login page.
 * 
 * Props: none
 * 
 * State:
 * formData: object { username, password }
 */
const LogIn = () => {
    const { login } = useContext(AuthContext);
    // State
    const [formData, setFormData] = useState({ username: '', password: '' });
    // Navigation
    const navigate = useNavigate();

    // Event Handlers
    const handleChange = (e) => {
        // destructure event
        const { name, value } = e.target;
        // update state using computed property names
        setFormData(data => ({
            ...data,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        // Prevent default form behavior
        e.preventDefault();
        try {
            // send login request
            const token = await PomodoroAPI.login(formData);
            const { username } = formData;
            // call login function
            login(username, token);
            // reset form
            setFormData({ username: '', password: '' });
            // navigate to home page
            navigate('/');
        }
        catch (err) {
            console.error(err);
        }
    };



    // Render
    return (
        <div className="LogIn">
            <h1 className="LogIn-title">Log In</h1>

            <form className="LogIn Form" onSubmit={handleSubmit}>
                {/* Username Input */}
                <div className = "form-group">
                    <label htmlFor="username">Username</label>
                    <input
                        className="form-control"
                        id="username"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                    />
                </div>
                {/* Password Input */}
                <div className = "form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        className="form-control"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                    />
                </div>
                {/* Submission Button */}
                <button className='btn'>Log In!</button>
            </form>
        </div>
    )
};

// Exports
export default LogIn;