// Imports
import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import PomodoroAPI from './PomodoroAPI';
import { AuthContext } from './AuthContext';
import './Signup.css';
/** Signup Component
 * 
 * This component is responsible for rendering the signup form.
 * 
 * Props:
 * - login: function to handle login
 * 
 * State:
 * - formData: object { username, password, firstName, lastName, email, avatar }
 */
const Signup = () => {
    const { login } = useContext(AuthContext);
    // State
    const INITIAL_STATE = {
        username: '',
        password: '',
        firstName: '',
        lastName: '',
        email: '',
        avatar: ''
    };
    const [formData, setFormData] = useState(INITIAL_STATE);

    // Navigation
    const navigate = useNavigate();

    // Event Handlers
    const handleChange = (evt) => {
        const { name, value } = evt.target;
        setFormData(data => ({
            ...data,
            [name]: value
        }));
    };

    const handleSubmit = async (evt) => {
        evt.preventDefault();
        try {
            // Register user
            const token = await PomodoroAPI.registerUser(formData);
            // update root state var username / store token in localStorage
            login(formData.username, token);
            // reset form
            setFormData(INITIAL_STATE);
            // navigate to home page
            navigate('/');
        }
        catch (err) {
            console.error(err);
        }
    }

    // Render
    return (
        <div className="Signup">
            <h1 className='Signup-title'>Signup</h1>

            <form className='Signup-form form' onSubmit={handleSubmit}>
                <div className="form-group">
                    <label className='form-label' htmlFor='username'>Username</label>
                    <input
                        className='form-control'
                        type='text'
                        id='username'
                        name='username'
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label className='form-label' htmlFor='password'>Password</label>
                    <input
                        className='form-control'
                        type='password'
                        id='password'
                        name='password'
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label className='form-label' htmlFor='firstName'>First Name</label>
                    <input
                        className='form-control'
                        type='text'
                        id='firstName'
                        name='firstName'
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label className='form-label' htmlFor='lastName'>Last Name</label>
                    <input
                        className='form-control'
                        type='text'
                        id='lastName'
                        name='lastName'
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label className='form-label' htmlFor='email'>Email</label>
                    <input
                        className='form-control'
                        type='email'
                        id='email'
                        name='email'
                        onChange={handleChange}
                    />
                </div>
                {/* <div className="form-group">
                    <label className='form-label' htmlFor='avatar'>Avatar</label>
                    <input
                        className='form-control'
                        type='text'
                        id='avatar'
                        name='avatar'
                        onChange={handleChange}
                    />
                </div> */}
                <button className='btn btn-sm btn-primary'>Submit</button>
            </form>
        </div>
    )
};

// Exports
export default Signup;