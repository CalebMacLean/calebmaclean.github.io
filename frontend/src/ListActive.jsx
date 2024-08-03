// Imports
import React, { useState, useEffect } from 'react';

import PomodoroAPI from './PomodoroAPI';
import Task from './Task';
import TaskNewForm from './TaskNewForm';
import './ListActive.css';

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
const ListActive = ({ activeList, setActiveTask, activeTask, isTimerEnd }) => {
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
        // get tasks for active list
        getTasks(activeList.id);

    }, [activeList]);

    useEffect(() => {
        if (!activeTask && tasks.length > 0) setActiveTask(tasks[0]);

    }, [tasks]);

    useEffect(() => {
        async function completeCycle() {
            try {
                let { listId, id } = activeTask;
                console.log("ListActive completeCycle listId: ", listId);
                console.log("ListActive completeCycle id: ", id);
                let res = await PomodoroAPI.incrementTask(listId, id);
                console.log("ListActive completeCycle res: ", res);
                getTasks(listId);
            }
            catch (err) {
                console.error(err);
            }
        }
        if (isTimerEnd) {
            completeCycle();
        }
    }, [isTimerEnd]);

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
        e.target.classList.add("completed");
        setCompletedTasks([...completedTasks, +taskId]);
    }

    const handleRemoveCompletedTaskClick = (e) => {
        setRemoveCompletedTasks(true);
    }

    const handleSetActiveTask = (e) => {
        const id = +e.target.id;
        // console.log("handleSetActiveTask id: ", id);
        const task = tasks.find(t => t.id === id);
        // console.log("handleSetActiveTask task: ", task);
        if (task) setActiveTask(task);
    }

    // Render
    return (
        <div className="ListActive container">
            <div className="ListActive-header row">
                <h1 className="ListActive-title">{activeList.title}</h1>
            </div>
            <div className="ListActive-btn-wrapper">
                {completedTasks.length > 0 ? (
                    <button className='btn btn-sm btn-secondary'
                        onClick={handleRemoveCompletedTaskClick}>Remove Finished Tasks</button>
                ) : null}
            </div>
            <div className="ListActive-task-wrapper">
                {tasks.map(task => {
                    // console.log("ListActive task: ", task);
                    // console.log("ListActive activeTask: ", activeTask);
                    if (activeTask && task.id === activeTask.id) {
                        return (
                            <Task task={task}
                                key={task.id}
                                handleCompleteTaskClick={handleCompleteTaskClick}
                                getTasks={getTasks}
                                listId={activeList.id}
                                isActiveTask={true}
                                handleSetActiveTask={handleSetActiveTask}
                            />
                        )
                    }
                    return (
                        <Task key={task.id}
                            task={task}
                            handleCompleteTaskClick={handleCompleteTaskClick}
                            getTasks={getTasks}
                            listId={activeList.id}
                            isActiveTask={false}
                            handleSetActiveTask={handleSetActiveTask}
                        />
                    )
                })}
            </div>
            <div className="task-btn-wrapper">
                {showCreateTaskForm ? (
                    <TaskNewForm listId={activeList.id} setTasks={setTasks} setShowCreateTaskForm={setShowCreateTaskForm} />
                ) : (
                    <button className="btn btn-sm btn-secondary" onClick={handleCreateTaskClick}>Create Task</button>
                )}
            </div>
        </div>
    )
}

// Exports
export default ListActive;