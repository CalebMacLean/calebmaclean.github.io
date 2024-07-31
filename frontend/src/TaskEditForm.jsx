// Imports
import React, { useState } from 'react';

import PomodoroAPI from './PomodoroAPI';

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
const TaskEditForm = ({ task, setShowEditTaskForm, getTasks, listId }) => {
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
        let data = { ...formData, listId };
        try {
            let res = await PomodoroAPI.updateTask(task.id, data);
            getTasks(listId);
            setShowEditTaskForm(false);
        }
        catch (err) {
            return console.error(err);
        }
    };

    // Render
    return (
        <div className='TaskEditForm'>
            <form onSubmit={handleSubmit}>
                <label htmlFor='title'>Title:</label>
                <input
                    id='title'
                    name='title'
                    value={formData.title}
                    onChange={handleChange}
                />
                <label htmlFor='expectedPomodoros'>Expected Pomodoros:</label>
                <input
                    id='expectedPomodoros'
                    name='expectedPomodoros'
                    value={formData.expectedPomodoros}
                    onChange={handleChange}
                />
                <button>Save</button>
            </form>
        </div>
    )
}

// Exports
export default TaskEditForm;