// Imports
import React, { useState, useEffect } from 'react';

import PomodoroAPI from './PomodoroAPI';
import './ListNewForm.css';

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
    // State
    const INITIAL_STATE = { title: '', listType: '' };
    const [formData, setFormData] = useState(INITIAL_STATE);

    // Event Handlers
    const handleChange = (e) => {
        // extract name and value properties from the input elements in the form.
        const { name, value } = e.target;
        // listType should be converted to a boolean when set in formData.
        setFormData(data => ({
            ...data,
            [name]: name === 'listType' ? value === 'true' : value
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
    // return (
    //     <div className='ListNewForm container-md text-center'>
    //         <div className="row">
    //             <button className='btn btn-sm btn-secondary col-2' onClick={() => setShowCreateList(false)}>Back</button>
    //         </div>
    //         <div className="row">
    //             <form className="ListNewForm-form" onSubmit={handleSubmit}>
    //                 {/* Title Field */}
    //                 <div className="form-floating mb-3">
    //                     <input
    //                         className='form-control form-control-sm'
    //                         type='text'
    //                         id='title'
    //                         name='title'
    //                         value={formData.title}
    //                         onChange={handleChange}
    //                     />
    //                     <label className='form-label' htmlFor='title' >Title: </label>
    //                 </div>
    //                 {/* List Type Field */}
    //                 <select
    //                     className='form-select form-select-lg mb-3'
    //                     id='listType'
    //                     name='listType'
    //                     value={formData.listType}
    //                     onChange={handleChange}
    //                 >
    //                     <option value='' disabled>List Type</option>
    //                     <option value='true'>FOCUS</option>
    //                     <option value='false'>BREAK</option>
    //                 </select>
    //                 {/* Submit Button */}
    //                 <button type='submit' className='btn btn-primary'>Create List</button>
    //             </form>
    //         </div>
    //     </div>
    // )
    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-10">
                    <div className="card">
                        <button className='btn btn-sm btn-secondary w-25' onClick={() => setShowCreateList(false)}>Back</button>
                        <div className="mt-3">
                            <h3 className="card-title">New List</h3>
                        </div>
                        <div className="card-body">
                            <form>
                                <div className="form-floating mb-3">
                                    <input
                                        className='form-control'
                                        type='text'
                                        id='title'
                                        name='title'
                                        value={formData.title}
                                        onChange={handleChange}
                                        placeholder="Title"
                                    />
                                    <label className='form-label' htmlFor='title'>Title</label>
                                </div>
                                {/* List Type Field */}
                                <div className="form-floating mb-3">
                                    <select
                                        className='form-select'
                                        id='listType'
                                        name='listType'
                                        value={formData.listType}
                                        onChange={handleChange}
                                    >
                                        <option value='' disabled>List Type</option>
                                        <option value='true'>FOCUS</option>
                                        <option value='false'>BREAK</option>
                                    </select>
                                    <label className='form-label' htmlFor='listType'>List Type</label>
                                </div>
                                {/* Submit Button */}
                                <button type='submit' className='btn btn-primary w-100'>Create List</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Exports
export default ListNewForm;