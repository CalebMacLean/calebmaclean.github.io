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

    // Conditional VariableT
    // console.log("Task isActiveTask: ", isActiveTask);
    const className = isActiveTask ? "Task task-active" : "Task";
    // console.log("Task className: ", className);
    
    // Render
    return (
        <div className='Task-wrapper'>
        { showEditTaskForm ? (
            <TaskEditForm task={task} 
                setShowEditTaskForm={setShowEditTaskForm}
                getTasks={getTasks}
                listId={listId} 
            />
        ) : (
            <div className={className + " container"} id={task.id} onClick={handleSetActiveTask}>
                <button className='Task-item complete-btn' id={task.id} onClick={handleCompleteTaskClick}></button>
                <p className='Task-title task-item'>{ task.title }</p>
                <div className='Task-stat task-item'>{task.completedCycles}/{task.expectedPomodoros}</div>
                <div id={task.id} 
                    onClick={handleEditTaskClick}
                    className='Task-edit-btn-wrapper'>
                        <div className="Task-edit-btn-circle"></div>
                        <div className="Task-edit-btn-circle"></div>
                        <div className="Task-edit-btn-circle"></div>
                    </div>
            </div>
        )}
        </div>
    )
};

// Exports
export default Task;