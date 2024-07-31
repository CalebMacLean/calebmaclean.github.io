// Imports
import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import PomodoroAPI from './PomodoroAPI';
import { AuthContext } from './AuthContext';
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
            <h1>Signup</h1>

            <form className='Signup-form' onSubmit={ handleSubmit }>
                <label htmlFor='username'>Username</label>
                <input 
                    type='text' 
                    id='username' 
                    name='username'
                    onChange={ handleChange }
                />

                <label htmlFor='password'>Password</label>
                <input 
                    type='password' 
                    id='password' 
                    name='password'
                    onChange={ handleChange }
                />

                <label htmlFor='firstName'>First Name</label>
                <input 
                    type='text' 
                    id='firstName' 
                    name='firstName'
                    onChange={ handleChange } 
                />

                <label htmlFor='lastName'>Last Name</label>
                <input 
                    type='text' 
                    id='lastName' 
                    name='lastName'
                    onChange={ handleChange }
                />

                <label htmlFor='email'>Email</label>
                <input 
                    type='email' 
                    id='email' 
                    name='email' 
                    onChange={ handleChange }
                />

                <label htmlFor='avatar'>Avatar</label>
                <input 
                    type='text' 
                    id='avatar' 
                    name='avatar' 
                    onChange={ handleChange }
                />

                <button>Submit</button>
            </form>
        </div>
    )
};

// Exports
export default Signup;