// Imports
import React, { useState } from 'react';

import NavBar from './NavBar';
import RouterList from './RouterList';
import './App.css'
import { Router } from 'react-router-dom';

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
  const [user, setUser] = useState(null);
  // username var
  const username = user? user.username : null;

  // Event Handlers
  const handleLogin = (user, token) => {
    setUser(user);
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
