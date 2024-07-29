// Imports
import React, { useState } from 'react';

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
    const [formData, setFormData] = useState({ search: ''});

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
        <form className="SearchBar" onSubmit={handleSubmit}>
            <label htmlFor="search">Search:</label>
            <input
                id="search"
                name="search"
                value={formData.search}
                onChange={handleChange}
            />
            <button>Submit</button>
        </form>
    )
};

// Exports
export default SearchBar;