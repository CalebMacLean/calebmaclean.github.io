// Imports
import React, { useState } from 'react';

import './SearchBar.css';

/** SearchBar Component
 * 
 * This component is responsible for rendering a search bar. It provides a form to search for users by username.
 * 
 * Props:
 * - search: function to search for users by username
 * 
 * State:
 * - formData: object { username }
 */
const SearchBar = ({ search }) => {
    // State
    const [formData, setFormData] = useState({ search: '' });

    // Event Handlers
    const handleChange = (evt) => {
        const { name, value } = evt.target;
        setFormData(data => ({
            ...data,
            [name]: value
        }));
    }

    const handleSubmit = (evt) => {
        evt.preventDefault();
        search(formData.search);
    }

    // Render
    return (
        <form className="SearchBar form" onSubmit={handleSubmit}>
            <div className="form-group">
                <input
                    className="form-control search-input"
                    id="search"
                    name="search"
                    value={formData.search}
                    onChange={handleChange}
                    placeholder='Search...'
                />
            </div>
            <div className="SearchBar-btn-wrapper">
            <button className='btn btn-sm btn-secondary'>Submit</button>
            </div>
        </form>
    )
};

// Exports
export default SearchBar;