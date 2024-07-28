// Imports
import React, { useState } from 'react';

import NavBar from './NavBar';
import RouterList from './RouterList';
import './App.css'

/** App Component
 * 
 * This component is responsible for rendering the application.
 * 
 * Props: none
 * 
 * State:
 * user: object { username, firstName, lastName, email, avatar, numPomodoros, isAdmin }
 */
function App() {
  // Root State
  const [username, setUsername] = useState(null);

  // Event Handlers
  const handleLogin = (username, token) => {
    setUsername(username);
    localStorage.setItem('token', token);
  }

  const handleLogout = () => {
    setUsername(null);
    localStorage.removeItem('token');
  }

  // Render
  return (
    <>
      <NavBar username={username} />
      <RouterList username={username} login={handleLogin} logout={handleLogout} />
    </>
  )
}

export default App
