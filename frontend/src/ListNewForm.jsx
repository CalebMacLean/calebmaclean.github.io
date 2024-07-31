// Imports
import React, { useState, useEffect } from 'react';

import PomodoroAPI from './PomodoroAPI';

/** ListNewForm Component
 * 
 * This component is responsible for rendering the form to create a new list.
 * 
 * Props:
 * - username: string
 * 
 * State:
 * - formData: object like { name }
 */
const ListNewForm = ({ username, setShowCreateList, setActiveList }) => {
    console.log("ListNewForm username: ", username);
    // State
    const INITIAL_STATE = { title: '', listType: true };
    const [formData, setFormData] = useState(INITIAL_STATE);

    // Event Handlers
    const handleChange = (e) => {
        // extract name and value properties from the input elements in the form.
        const { name, value } = e.target;
        // listType should be converted to a boolean when set in formData.
        setFormData(data => ({
            ...data,
            [name]: name === 'listType' ?value === 'true' : value
        }));
    }

    const handleSubmit = async (e) => {
        // prevent refresh
        e.preventDefault();
        try {
            formData.username = username;
            console.log("handleSubmit formData Username: ", formData.username);
            let res = await PomodoroAPI.createList(formData);
            setFormData(INITIAL_STATE);
            setShowCreateList(false);
            setActiveList(res);
        }
        catch (err) {
            console.error(err);
        }
    }

    // Render
    return (
        <>
            <form onSubmit={handleSubmit}>
                {/* Title Field */}
                <label htmlFor='title'>Title: </label>
                <input
                    type='text'
                    id='title'
                    name='title'
                    value={formData.title}
                    onChange={handleChange}
                />
                {/* List Type Field */}
                <label htmlFor='listType'>List Type: </label>
                <select
                    id='listType'
                    name='listType'
                    value={formData.listType}
                    onChange={handleChange}
                >
                    <option value='true'>FOCUS</option>
                    <option value='false'>BREAK</option>
                </select>
                {/* Submit Button */}
                <button type='submit'>Create List</button>
            </form>
        </>
    )
};

// Exports
export default ListNewForm;