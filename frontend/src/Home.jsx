// Imports
import React from 'react';

/** Home Component
 * 
 * This componenet is responsible for rendering the home page.
 * 
 * Props: none
 * 
 * State: none
 */
const Home = ({ username }) => {
    // Render
    return (
        <div className='Home'>
            { username ? (
                <h2 className='Home-message'>Welcome, {username}</h2>
            ) : (
                <h2 className='Home-message'>Welcome to the Pomodoro Clock</h2>
            )}
        </div>
    )
};

// Exports
export default Home;