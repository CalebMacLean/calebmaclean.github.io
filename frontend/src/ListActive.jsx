// Imports
import React, { useState, useEffect } from 'react';

import PomodoroAPI from './PomodoroAPI';
import Task from './Task';
import TaskNewForm from './TaskNewForm';

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
    // console.log("ListActive activeList: ", activeList);
    // State
    const [tasks, setTasks] = useState([]);
    const [completedTasks, setCompletedTasks] = useState([]);
    const [showCreateTaskForm, setShowCreateTaskForm] = useState(false);
    const [removeCompletedTasks, setRemoveCompletedTasks] = useState(false);

    // Helper Functions
    async function getTasks(listId) {
        // console.log("ListActive activeList: ", activeList);

        try {
            let res = await PomodoroAPI.getTasksForList(listId);
            // console.log("ListActive getTasks res: ", res);
            setTasks(res);
        }
        catch (err) {
            return console.error(err);
        }
    }

    // Effects
    useEffect(() => {
        getTasks(activeList.id);

    }, [activeList]);

    useEffect(() => {
        async function removeTasks() {
            try {
                let res = await PomodoroAPI.removeCompletedTasks(activeList.id, completedTasks);
                getTasks(activeList.id);
            }
            catch (err) {
                console.error(err);
            }
        }
        if (removeCompletedTasks) {
            removeTasks();
            setRemoveCompletedTasks(false);
            setCompletedTasks([]);
        }
    }, [removeCompletedTasks]);

    // Event Handlers
    const handleCreateTaskClick = (e) => {
        setShowCreateTaskForm(true);
    }

    const handleCompleteTaskClick = (e) => {
        const taskId = e.target.id;
        setCompletedTasks([...completedTasks, +taskId]);
    }

    const handleRemoveCompletedTaskClick = (e) => {
        setRemoveCompletedTasks(true);
    }

    // Render
    return (
        <div className="ListActive">
            <h1>{activeList.title}</h1>
            {completedTasks.length > 0 ? (
                <button onClick={handleRemoveCompletedTaskClick}>Remove Finished Tasks</button>
            ) : null}

            {tasks.map(task => (
                    <Task key={task.id} 
                        task={task} 
                        handleCompleteTaskClick={handleCompleteTaskClick} 
                        getTasks={getTasks}
                        listId={activeList.id}
                    />
            ))}

            {showCreateTaskForm ? (
                <TaskNewForm listId={activeList.id} setTasks={setTasks} setShowCreateTaskForm={setShowCreateTaskForm} />
            ) : (
                <button onClick={handleCreateTaskClick}>Create Task</button>
            )}
        </div>
    )
}

// Exports
export default ListActive;