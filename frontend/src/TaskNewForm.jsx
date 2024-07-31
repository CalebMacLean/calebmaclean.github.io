// Imports
import React, { useState } from 'react';

import PomodoroAPI from './PomodoroAPI';

/** TaskNewForm Component
 * 
 * This component is responsible for rendering a form to create a new task.
 * 
 * Props:
 * - listId: id of the list to which the task belongs
 * - setTasks: function to set the root state var tasks
 */
const TaskNewForm = ({ listId, setTasks, setShowCreateTaskForm }) => {
    // State
    const [formData, setFormData] = useState({
        title: '',
        expectedPomodoros: 1
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
            let res = await PomodoroAPI.createTask(data);
            setTasks(tasks => ([...tasks, res]));
            setFormData({
                title: '',
                expectedPomodoros: 1
            });
            setShowCreateTaskForm(false);
        }
        catch (err) {
            return console.error(err);
        }
    };

    // Render
    return (
        <div className='TaskNewForm'>
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
                    type='number'
                    value={formData.expectedPomodoros}
                    onChange={handleChange}
                />
                <button>Create Task</button>
            </form>
        </div>
    );
};

// Exports
export default TaskNewForm;