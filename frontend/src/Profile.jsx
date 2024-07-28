// Imports
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import PomodoroAPI from './PomodoroAPI';

/** Profile Component
 * 
 * This component is responsible for rendering a user's profile page. It provides a form to update a user's profile information.
 * 
 * Props:
 * - username: (str) the root state var username.
 * 
 * State:
 * - formData: (obj) user profile data.
 */
const Profile = ({ username }) => {
    // Navigation
    const navigate = useNavigate();

    // redirect to login if not logged in
    if (!username) navigate('/login', { replace: false });
    // redirect if token is missing
    if (!localStorage.getItem('token')) navigate('/login', { replace: false });

    // State
    const INITIAL_STATE = {
        firstName: '',
        lastName: '',
        email: '',
        avatar: '',
    }
    const [formData, setFormData] = useState(INITIAL_STATE);
    const [user, setUser] = useState(null);

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
            let updatedUser = await PomodoroAPI.updateUser(usernameInput, formData);
            setUser(updatedUser);
        }
        catch (errors) {
            console.error("Profile Update Error: ", errors);
        }
    };

    // Effects
    useEffect(() => {
        async function getUser() {
            const userRes = await PomodoroAPI.getUser(username);
            setUser(userRes);
        }
        getUser();
    }, [username]);

    // Render
    return (
        <div className='Profile'>
            {user ? (
                <>
                    <div className="profile-card">
                        <h1 className='Profile-tile'>{user.username}'s Page</h1>
                        <h3>{user.numPomodoros} pomodoro cycles completed.</h3>
                        <img src={"src/" + user.avatar} alt={user.username} />
                    </div>


                    <form className='Profile-form' onSubmit={handleSubmit}>
                        <label htmlFor='username'>Username:</label>
                        <input
                            type='text'
                            id='username'
                            name='username'
                            defaultValue={user.username}
                            onChange={handleChange}
                            disabled
                        />

                        <label htmlFor='firstName'>First Name:</label>
                        <input
                            type='text'
                            id='firstName'
                            name='firstName'
                            defaultValue={user.firstName}
                            onChange={handleChange}
                        />

                        <label htmlFor='lastName'>Last Name:</label>
                        <input
                            type='text'
                            id='lastName'
                            name='lastName'
                            defaultValue={user.lastName}
                            onChange={handleChange}
                        />

                        <label htmlFor='email'>Email:</label>
                        <input
                            type='email'
                            id='email'
                            name='email'
                            defaultValue={user.email}
                            onChange={handleChange}
                        />

                        <label htmlFor='avatar'>Avatar:</label>
                        <input
                            type='text'
                            id='avatar'
                            name='avatar'
                            defaultValue={user.avatar}
                            onChange={handleChange}
                        />

                        <button>Save Changes</button>
                    </form>
                </>
            ) : (
                <>
                    <h1>Loading...</h1>
                </>
            )}
        </div>
    )
};

// Exports
export default Profile;