// Imports
import React, { useState, useEffect } from 'react';
import { Router } from 'react-router-dom';

import NavBar from './NavBar';
import RouterList from './RouterList';
import PomodoroAPI from './PomodoroAPI';
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

  // Render
  return (
    <>
      <NavBar username={username} />
      <RouterList username={username} login={handleLogin} />
    </>
  )
}

export default App
