// Imports
import React, { useState, useEffect } from 'react';

import PomodoroAPI from './PomodoroAPI';
import './ListChooseForm.css';

/** ListChooseForm Component
 * 
 * This component is responsible for rendering the form to choose a new list. The form will use a select input to choose from a user's saved lists.
 * 
 * 
 * Props:
 * - lists: array of list objects like { id, title, listType }
 * 
 * State:
 * - formData: object like { name }
 */
const ListChooseForm = ({ lists, setActiveList, setShowChooseList }) => {
    // State
    const [formData, setFormData] = useState({});
    // Event Handlers
    const handleChange = (e) => {
        // extract the list id from select element
        const { value } = e.target;
        setFormData({ listId: value });
    }

    const handleSubmit = (e) => {
        // prevent refresh
        e.preventDefault();
        // find the selected list
        const list = lists.find(list => +list.id === +formData.listId);
        // set activeList
        if (list) setActiveList(list);
        // reset formData
        setFormData({});
        setShowChooseList(false);
    }

    // Render
    // return (
    //     <form className="ListChooseForm" onSubmit={handleSubmit}>
    //         {/* Choose List Field */}
    //         <label htmlFor="list-select">Choose a list: </label>
    //         <select
    //             name="list-select"
    //             id="list-select"
    //             onChange={handleChange}
    //         >
    //             {/* Default Option */}
    //             <option value="">---</option>
    //             {/* Create Options for User's Saved Lists */}
    //             {lists.map(list => (
    //                 <option key={list.id} value={list.id}>
    //                     {list.title}
    //                 </option>
    //             ))}
    //         </select>
    //         {/* Submit Button */}
    //         <button type='submit'>Submit</button>
    //     </form>
    // )
    return (
        <div className="ListChooseForm container mt-5 w-100">
            <div className="row justify-content-center">
                <div className="col-md-10">
                    <div className="card">
                        <button className='btn btn-sm btn-secondary w-25' onClick={() => setShowChooseList(false)}>Back</button>
                        <div>
                            <h3 className="card-title mb-0">Choose a List</h3>
                        </div>
                        <div className="card-body">
                            <form className="ListChooseForm" onSubmit={handleSubmit}>
                                <div className="form-floating mb-3">
                                    <select
                                        className='form-select'
                                        name="list-select"
                                        id="list-select"
                                        onChange={handleChange}
                                    >
                                        {/* Default Option */}
                                        <option value="">---</option>
                                        {/* Create Options for User's Saved Lists */}
                                        {lists.map(list => (
                                            <option key={list.id} value={list.id}>
                                                {list.title}
                                            </option>
                                        ))}
                                    </select>
                                    <label className='form-label' htmlFor="list-select">Choose a list</label>
                                </div>
                                {/* Submit Button */}
                                <button type='submit' className='btn btn-primary w-100'>Submit</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Exports
export default ListChooseForm;