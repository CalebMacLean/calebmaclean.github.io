// Imports
import React, { useState, useEffect } from 'react';

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
  const [timerType, setTimerType] = useState('FOCUS');

  // UseEffect
  useEffect(()=> {
    console.log(timerType)
  }, [timerType])
  const mainClass = timerType === 'FOCUS' ? 'main focus' : 'main break';

  // Render
  return (
    <div className='app'>
      <NavBar />
      <div className={mainClass}>
        <RouterList
          setActiveList={setActiveList}
          setActiveTask={setActiveTask}
          activeList={activeList}
          activeTask={activeTask}
          timerType={timerType}
          setTimerType={setTimerType}
        />
      </div>
    </div>
  )
}

export default App