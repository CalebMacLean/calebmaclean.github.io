// Imports
import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import PomodoroAPI from './PomodoroAPI';
import { AuthContext } from './AuthContext';
import './Profile.css';

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
const Profile = ({ }) => {
    // Navigation
    const navigate = useNavigate();
    const { username } = useContext(AuthContext);

    // redirect to login if not logged in
    // if (!username) navigate('/login', { replace: false });
    // redirect if token is missing
    // if (!localStorage.getItem('token')) navigate('/login', { replace: false });

    // State
    const INITIAL_STATE = {
        firstName: '',
        lastName: '',
        email: '',
        avatar: '',
    }
    const [formData, setFormData] = useState(INITIAL_STATE);
    const [user, setUser] = useState(null);
    const [friends, setFriends] = useState([])
    const [friendRequests, setFriendRequests] = useState([])
    const [updatedFriends, setUpdatedFriends] = useState(false)

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

    const handleApprove = async (username, sender) => {
        setUpdatedFriends(false)
        try {
            let approveRequest = await PomodoroAPI.approveRequest(username, sender)
            setUpdatedFriends(true)
        } catch (errors) {
            console.error("Request Approval Error: ", errors);

        }
    }
    const handleDeny = async (username, sender) => {
        setUpdatedFriends(false)
        try {
            let denyRequest = await PomodoroAPI.denyRequest(username, sender)
            setUpdatedFriends(true)
        } catch (errors) {
            console.error("Request Approval Error: ", errors);

        }
    }

    // Effects
    useEffect(() => {
        async function getUser() {
            if (!username) return;
            const userRes = await PomodoroAPI.getUser(username);
            const friendsRes = await PomodoroAPI.getFriends(username)
            const requestsRes = await PomodoroAPI.getFriendRequests(username)
            setUser(userRes);
            setFriends(friendsRes)
            setFriendRequests(requestsRes)
        }
        getUser();
    }, [username, updatedFriends]);

    // Render
    return (
        <div className='Profile-wrapper'>
            {user ? (
                <div className='Profile'>
                    <div className="Profile-header">
                        <div className="Profile-header-left">
                            <img className='Profile-img' src={"src/" + user.avatar} alt={user.username} />
                        </div>
                        <div className="Profile-header-right">
                            <h1 className='Profile-title'>{user.username}'s Page</h1>
                            <h3 className='Profile-stat'>{user.numPomodoros} pomodoro cycles completed.</h3>
                        </div>
                    </div>

                    <div className="Profile-main">
                        <div className="Profile-form-wrapper">

                            <form className='Profile-form form' onSubmit={handleSubmit}>
                                <div className="form-header">
                                    <h2>Edit Profile</h2>
                                </div>
                                <div className="form-group">
                                    <label className='form-label' htmlFor='username'>Username:</label>
                                    <input
                                        className='form-control'
                                        type='text'
                                        id='username'
                                        name='username'
                                        defaultValue={user.username}
                                        onChange={handleChange}
                                        disabled
                                    />
                                </div>
                                <div className="form-group">
                                    <label className='form-label' htmlFor='firstName'>First Name:</label>
                                    <input
                                        className='form-control'
                                        type='text'
                                        id='firstName'
                                        name='firstName'
                                        defaultValue={user.firstName}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label className='form-label' htmlFor='lastName'>Last Name:</label>
                                    <input
                                        className='form-control'
                                        type='text'
                                        id='lastName'
                                        name='lastName'
                                        defaultValue={user.lastName}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label className='form-label' htmlFor='email'>Email:</label>
                                    <input
                                        className='form-control'
                                        type='email'
                                        id='email'
                                        name='email'
                                        defaultValue={user.email}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label className='form-label' htmlFor='avatar'>Avatar:</label>
                                    <input
                                        className='form-control'
                                        type='text'
                                        id='avatar'
                                        name='avatar'
                                        defaultValue={user.avatar}
                                        onChange={handleChange}
                                    />
                                </div>
                                <button className='btn btn-sm btn-secondary'>Save Changes</button>
                            </form>
                        </div>
                        <div className='Profile-lists-wrapper'>
                            <div className='Profile-lists-header'>
                                <h3>Lists</h3>
                            </div>
                            {user.lists.length > 0 ? (
                                <>
                                    <div className='Profile-lists-main'>
                                        <div className='Profile-lists'>
                                            {user.lists.map(list => (
                                                <span className='Profile-list' key={list.id}>{list.title}</span>
                                            ))}
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <p>No Lists</p>
                            )}
                        </div>
                        <div className='Profile-friends-wrapper'>
                            <div className='Profile-friends-header'>
                                <h3>Friends</h3>
                            </div>
                            {friends.length > 0 ? (
                                <>
                                    <div className='Profile-friends-main'>
                                        {friends.map(friend => (
                                            <div className="card">
                                                <span className='Profile-friend' key={friend.username}>{friend.username}</span>
                                            </div>
                                        ))}
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div className='Profile-friends-main'>
                                        <p>No Friends</p>
                                    </div>
                                </>
                            )
                            }
                        </div>
                        <div className='Profile-requests-wrapper'>
                            <div className='Profile-requests-header'>
                                <h3>Friend Requests</h3>
                            </div>
                            {friendRequests.length > 0 ? (
                                <>
                                    <div className='Profile-requests-main'>
                                        {friendRequests.map(request => (
                                            <div className='card Profile-request' key={request.username}>
                                                <div className="Profile-request-left">
                                                    <p key={request.username}>{request.username}</p>
                                                </div>
                                                <div className="Profile-request-right">
                                                    <button className="btn btn-sm btn-primary" onClick={() => handleApprove(username, request.username)}>Approve</button>
                                                    <button className="btn btn-sm btn-primary" onClick={() => handleDeny(username, request.username)}>Reject</button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                </>
                            ) :
                                <p>No Friend Requests</p>
                            }
                        </div>
                    </div>
                </div>
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