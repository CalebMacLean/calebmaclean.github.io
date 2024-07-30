// Imports
import React from 'react';

import Timer from './Timer';
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
const Home = ({ username, activeList, setActiveList, activeTask, setActiveTask }) => {
    // Render
    return (
        <div className='Home'>
            { username ? (
                <>
                <h2 className='Home-message'>Welcome, {username}</h2>
                <Timer username={username} 
                    activeTask={activeTask} 
                    setActiveTask={setActiveTask} 
                    activeList={activeList} 
                />
                <ListWorking activeList={activeList} setActiveList={setActiveList} />
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