// Imports
import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';

import PomodoroAPI from './PomodoroAPI';
import { AuthContext } from './AuthContext';
import './UserDetail.css';


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
    const [hasRequested, setHasRequested] = useState(false);
    const [isFriend, setIsFriend] = useState(false)
    const { username } = useParams();
    const { activeUser } = useContext(AuthContext)

    // Side Effects
    useEffect(() => {
        async function getUser() {
            const userRes = await PomodoroAPI.getUser(username);
            setUser(userRes);
        }
        async function checkIfFriend() {
            if (!activeUser || !username) return;
            const friendRes = await PomodoroAPI.getFriend(activeUser, username);
            if (!friendRes) setIsFriend(false)
            else {

                if (friendRes) setIsFriend(true)
                if (friendRes.requestStatus == false) setHasRequested(true);
            }
            console.log(friendRes)
        }
        getUser();
        checkIfFriend();
    }, [username, activeUser, hasRequested]);

    const handleRequest = async () => {
        try {
            const request = await PomodoroAPI.requestFriend(activeUser, username)
            setHasRequested(true)
        } catch (error) {
            console.log("Friend Request Error: ", error)
        }
    }

    // Render
    return (
        <div className="UserDetail-wrapper">
            {user ? (
                <div className='UserDetail'>
                    <div className='UserDetail-header'>
                        <div className='UserDetail-img-wrapper'>
                            <img src={"/src/assets/default_pfp.jpg"} alt={user.username} />
                        </div>
                        <div className="UserDetail-info-wrapper">
                            <h3>{user.username}</h3>
                            <p>{user.first_name} {user.last_name}</p>
                            <p>{user.email}</p>
                            <p>{user.num_pomodoros || 0} Pomodoros Completed</p>
                            {/** This series of conditional rendering is a little difficult to read, but it accomplishes the following:
                                *  If the logged in user is looking at their own card, we won't bother with the adding friend logic at all
                                *      If the logged in user is friends with the user they're viewing, then either 
                                *          display that a request is pending or
                                *          display that they're friends if a request has been approved
                                *      If they're not friends with the user then display a button to add friend
                                */}
                            {user.username == activeUser ?
                                <>
                                </> :
                                isFriend ?
                                    <div>
                                        {hasRequested ? <h2>Friend request pending</h2> : <h2>You are friends with {username}</h2>}
                                    </div> :
                                    <div>
                                        <button className='btn btn-sm btn-primary' onClick={handleRequest}>Add Friend</button>
                                    </div>
                            }
                        </div>
                    </div>
                    <div className='UserDetail-lists-wrapper'>
                        {user.lists.length > 0 ? (
                            <>
                                <div className='UserDetail-lists-header'>
                                    <h3>Lists</h3>
                                </div>
                                <div className='UserDetail-lists-main'>
                                    {user.lists.map(list => (
                                        <div className="UserDetail-list">
                                            <p className='UserDetail-list-info' key={list.id}>{list.title}</p>
                                        </div>
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