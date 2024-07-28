// Imports
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import PomodoroAPI from './PomodoroAPI';

/** LogIn Component
 * 
 * This component is responsible for rendering the login page.
 * 
 * Props: none
 * 
 * State:
 * formData: object { username, password }
 */
const LogIn = ({ login }) => {
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
        e.preventDefault;
        try {
            // send login request
            const token = await PomodoroAPI.login(formData);
            // make a request to get the user
            const user = await PomodoroAPI.getUser(formData.username);
            // call login function
            login(user, token);
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

            <form className="LogIn Form" >
                {/* Username Input */}
                <div className = "form-group">
                    <label htmlFor="username">Username</label>
                    <input
                        className="form-control"
                        id="username"
                        name="username"
                        value={formData.username}
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