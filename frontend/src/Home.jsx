// Imports
import React from 'react';
import './Home.css';

/** Home Component
 * 
 * This component is responsible for rendering the homepage.
 * 
 * Props: none
 * 
 * State: none
 */
const Home = ({ username }) => {
    const name = username ? username.username : null;
    // Render
    return (
        <div className='Home'>
            <h1>Pomodoro <Clock></Clock></h1>
            {username ? 
                <h2>Welcome, { name }!</h2> : 
                <h2>Your Focus Starts Now!</h2>
            }
        </div>
    )
};

// Exports
export default Home;