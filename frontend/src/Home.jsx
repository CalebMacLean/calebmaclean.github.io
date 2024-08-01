// Imports
import React, {useContext, useState} from 'react';

import Timer from './Timer';
import ListWrapper from './ListWrapper';
import { AuthContext } from './AuthContext';
/** Home Component
 * 
 * This componenet is responsible for rendering the home page.
 * 
 * Props:
 * - username: (str) the root state var username.
 * - activeList: (obj) the root state var activeList.
 * - activeTask: (obj) the root state var activeTask.
 * - setActiveTask: (func) a function to set the root state var activeTask.
 * 
 * State: none
 */
const Home = ({ activeList, setActiveList, activeTask, setActiveTask }) => {
    // Context
    const { username } = useContext(AuthContext);
    // State
    const [isTimerEnd, setIsTimerEnd] = useState(false);
    // Render
    return (
        <div className='Home'>
            { username ? (
                <>
                <h2 className='Home-message'>Welcome, {username}</h2>
                <Timer username={username} 
                    setIsTimerEnd={setIsTimerEnd}
                    isTimerEnd={isTimerEnd}
                />
                <ListWrapper activeList={activeList} 
                    setActiveList={setActiveList} 
                    username={username}
                    setActiveTask={setActiveTask}
                    activeTask={activeTask}
                    isTimerEnd={isTimerEnd}
                />
                </>
            ) : (
                <>
                <h2 className='Home-message'>Welcome to the Pomodoro Clock</h2>
                <p>Log In or Register to continue!</p>
                </>
            )}
        </div>
    )
};

// Exports
export default Home;