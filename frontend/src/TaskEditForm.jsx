// Imports
import React, { useState } from 'react';

import PomodoroAPI from './PomodoroAPI';
import './TaskEditForm.css';
/** TaskEditForm Component
 * 
 * This component is responsible for rendering a form to edit a task.
 * 
 * Props:
 * - task: (obj) { id, title, expectedPomodoros }
 * - setShowEditTaskForm: (func) a function to hide/show the edit task form
 * - getTasks: (func) a function to get the tasks for a list
 * - listId: (int) the id of the list to which the task belongs
 * 
 * State:
 * - formData: (obj) { title, expectedPomodoros }
 */
const TaskEditForm = ({ task, setShowEditTaskForm, getTasks }) => {
    // State
    const [formData, setFormData] = useState({
        title: task.title,
        expectedPomodoros: task.expectedPomodoros
    });

    // Event Handlers
    const handleChange = (evt) => {
        const { name, value } = evt.target;
        setFormData(data => ({
            ...data,
            [name]: name === 'expectedPomodoros' ? +value : value
        }));
    };

    const handleSubmit = async (evt) => {
        evt.preventDefault();
        let data = { ...formData };
        try {
            let res = await PomodoroAPI.updateTask(task.listId, task.id, data);
            console.log("TaskEditForm handleSubmit res: ", res);
            getTasks(task.listId);
            setShowEditTaskForm(false);
        }
        catch (err) {
            return console.error(err);
        }
    };

    // Render
    return (
        <div className='TaskEditForm'>
            <form className='TaskEditForm-form form' onSubmit={handleSubmit}>
                <div className="TaskEditForm-input-wrapper form-floating">
                    <input
                        className='form-control'
                        id='title'
                        name='title'
                        value={formData.title}
                        onChange={handleChange}
                    />
                    <label className='form-label' htmlFor='title'>Title:</label>
                </div>
                <div className="TaskEditForm-input-wrapper form-floating">
                    <input
                        className='form-control'
                        id='expectedPomodoros'
                        name='expectedPomodoros'
                        value={formData.expectedPomodoros}
                        onChange={handleChange}
                    />
                    <label className='form-label' htmlFor='expectedPomodoros'>Expected Pomodoros:</label>
                </div>
                <div className="TaskEditForm-btn-wrapper">
                    <button className='TaskEditForm-btn btn btn-secondary btn-sm'>Save</button>
                    <button onClick={() => setShowEditTaskForm(false)} className='TaskEditForm-btn btn btn-secondary btn-sm'>Back</button>
                </div>
            </form>
        </div>
    )
}

// Exports
export default TaskEditForm;