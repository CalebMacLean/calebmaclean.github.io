// Imports
import React, { useState } from 'react';

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
  const [activeList, setActiveList] = useState(null);
  const [activeTask, setActiveTask] = useState(null);

  // Render
  return (
    <>
      <NavBar />
      <RouterList 
        setActiveList={setActiveList}
        setActiveTask={setActiveTask}
        activeList={activeList}
        activeTask={activeTask}
      />
    </>
  )
}

export default App
