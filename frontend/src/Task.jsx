// Imports
import React, { useState, useEffect } from 'react';

import TaskEditForm from './TaskEditForm';
import './Task.css';
/** Task Component
 * 
 * This component is responsible for rendering a task.
 * 
 * Props:
 * - task: (obj) { id, title, completedCycles, expectedPomodoros }
 * - handleCompleteTaskClick: (func) a function to handle the completion of a task.
 * 
 * State:
 * - showEditTaskForm: (bool) hides/shows edit task form
 */
const Task = ({ task, handleCompleteTaskClick, getTasks, listId, isActiveTask, handleSetActiveTask }) => {
    // State
    const [showEditTaskForm, setShowEditTaskForm] = useState(false);

    // Event Handlers
    const handleEditTaskClick = (e) => {
        setShowEditTaskForm(true);
    }

    // Conditional Variables
    // console.log("Task isActiveTask: ", isActiveTask);
    const className = isActiveTask ? "Task Task-active" : "Task";
    // console.log("Task className: ", className);
    // Render
    return (
        <>
        { showEditTaskForm ? (
            <TaskEditForm task={task} 
                setShowEditTaskForm={setShowEditTaskForm}
                getTasks={getTasks}
                listId={listId} 
            />
        ) : (
            <div className={className} id={task.id} onClick={handleSetActiveTask}>
                <h3>{ task.title }</h3>
                <div>{task.completedCycles}/{task.expectedPomodoros}</div>
                <button id={task.id} onClick={handleCompleteTaskClick}>Complete Task</button>
                <button id={task.id} onClick={handleEditTaskClick}>Edit</button>
            </div>
        )}
        </>
    )
};

// Exports
export default Task;