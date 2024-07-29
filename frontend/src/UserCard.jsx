// Imports
import React from 'react';
import { Link } from 'react-router-dom';

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
                <img src={"src/assets/default_pfp.jpg"} alt={user.username} />
                <h3>{user.username}</h3>
                <p>{user.first_name} {user.last_name}</p>
                <p>{user.email}</p>
                <p>{user.num_pomodoros} Pomodoros</p>
            </Link>
        </div>
    )
};

// Exports
export default UserCard;