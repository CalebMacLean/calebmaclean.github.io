// Imports
import React, { useState, useEffect } from 'react';

import PomodoroAPI from './PomodoroAPI';

/** ListActive Component
 * 
 * This component is responsible for rendering the active list and its tasks.
 * 
 * Props:
 * - activeList: (obj) { id, title, listType, createdAt, expiresAt }
 * 
 * State:
 * - tasks: (arr) [{id, title, completedCycles, expectedPomodoros}, ...]
 * - completedTasks: (arr) [id, ...]
 * - showCreateTaskForm: (bool) hides/shows create task form
*/
const ListActive = ({ activeList }) => {
    // State
    const [tasks, setTasks] = useState([]);
    const [completedTasks, setCompletedTasks] = useState([]);
    const [showCreateTaskForm, setShowCreateTaskForm] = useState([]);

    // Effects
    useEffect(() => {
        async function getTasks(listId) {
            try{
                let res = await PomodoroAPI.get(listId);
                setTasks(res.tasks);
            }
            catch (err) {
                return console.error(err);
            }
        }
    }, []);
}

// Exports
export default ListActive;