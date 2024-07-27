// Imports
import React, { useState } from 'react'
import RouteList from './RouteList';
import NavBar from './NavBar';
import './App.css'

/** App Component
 * 
 * This component is responsible for rendering the application.
 * 
 * Props: none
 * 
 * State:
 * isLoading: boolean
 * user: object { username, firstName, lastName, email, isAdmin }
 */
function App() {
  // State
  const [username, setUsername] = useState(null);

  // Event Handlers
  const handleLogin = (user, token) => {
    setUsername(user);
    localStorage.setItem('token', token);
  };

  const handleLogout = () => {
    setUsername(null);
    localStorage.removeItem('token');
  };

  return (
    <>
      <NavBar username={ username } />
      <RouteList logout={ handleLogout } login={ handleLogin } username={ username } />
    </>
  )
}

export default App