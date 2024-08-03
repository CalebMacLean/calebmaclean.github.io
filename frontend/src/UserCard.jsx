// Imports
import React from 'react';
import { Link } from 'react-router-dom';

import './UserCard.css'

/** UserCard Component
 * 
 * This component is responsible for rendering a user card. It provides a link to the user's profile page.
 * 
 * Props:
 * - user: object like { username, first_name, last_name, email, avatar, num_pomodoros, is_admin }
 * 
 * State: none
 */
const UserCard = ({ user }) => {
    // Render
    return (
        <div className="UserCard">
            <Link to={`/users/${user.username}`}>
                <div className="UserCard-header">
                <div className="img-wrapper">
                    <img className="UserCard-img" src={"src/assets/default_pfp.jpg"} alt={user.username} />
                </div>
                    <h3>{user.username}</h3>
                </div>
                <div className="info-wrapper">
                    <p>{user.first_name} {user.last_name}</p>
                    <p>{user.email}</p>
                </div>
            </Link>
        </div>
    )
};

// Exports
export default UserCard;