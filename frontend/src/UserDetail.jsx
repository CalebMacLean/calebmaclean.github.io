// Imports
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import PomodoroAPI from './PomodoroAPI';

/** UserDetail Component
 * 
 * This component is responsible for rendering a user's profile page. It provides a link to the user's profile page.
 * 
 * Props: none
 * 
 * State: 
 * - user: object like { username, first_name, last_name, email, avatar, num_pomodoros, is_admin }
 */
 const UserDetail = () => {
    // State
    const [user, setUser] = useState(null);
    const { username } = useParams();

    // Side Effects
    useEffect(() => {
        async function getUser() {
            const userRes = await PomodoroAPI.getUser(username);
            setUser(userRes);
        }
        getUser();
    }, [username]);

    // Render
    return (
        <div className="UserDetail">
            {user ? (
                <div>
                    <div>
                        <img src={"/src/assets/default_pfp.jpg"} alt={user.username} />
                        <h3>{user.username}</h3>
                        <p>{user.first_name} {user.last_name}</p>
                        <p>{user.email}</p>
                        <p>{user.num_pomodoros || 0} Pomodoros Completed</p>
                    </div>
                    <div>
                        {user.lists.length > 0 ? (
                            <>
                            <h3>Lists</h3>
                            <div>
                                {user.lists.map(list => (
                                    <p key={list.id}>{list.title}</p>
                                ))}
                            </div>
                            </>
                        ) : (
                            <p>No Lists</p>
                        )}
                    </div>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    )
 };

// Exports
export default UserDetail;