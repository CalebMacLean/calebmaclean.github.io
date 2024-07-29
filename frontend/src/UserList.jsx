// Imports
import React, { useState, useEffect } from 'react';

import PomodoroAPI from './PomodoroAPI';
import UserCard from './UserCard';
import SearchBar from './SearchBar';

/** UserList Component
 * 
 * This component is responsible for rendering a list of users. It provides a search form to filter users by username.
 * 
 * Props: none
 * 
 * State:
 * - users: (array) list of user objects like { username, first_name, last_name, email, avatar, num_pomodoros, is_admin }
 */
const UserList = () => {
    // State
    const [users, setUsers] = useState([]);

    // Side Effects
    useEffect(() => {
        async function getUsers() {
            const usersRes = await PomodoroAPI.getUsers();
            setUsers(usersRes);
        }
        getUsers();
    }, []);

    // Helper Functions
    const search = async (username) => {
        const usersRes = await PomodoroAPI.findUsers(username);
        setUsers(usersRes);
    };

    // Render
    return (
        <div className="UserList">
            <h1 className="UserList-title">Users</h1>
            <SearchBar search={search} />

            <div className="UserList-users">
                {users.map(user => (
                    <UserCard key={user.username} user={user} />
                ))}
            </div>
        </div>
    )
};

// Exports
export default UserList;