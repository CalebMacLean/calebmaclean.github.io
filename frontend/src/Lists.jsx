// Imports
import React, { useState, useEffect } from 'react';

import PomodoroAPI from './PomodoroAPI';
import ListCard from './ListCard';
import SearchBar from './SearchBar';

/** Lists Component
 * 
 * This component is responsible for rendering a list of lists. It provides a search form to filter lists by name.
 * 
 * Props: none
 * 
 * State:
 * - lists: (array) list of list objects like { id, name, description }
 */
const Lists = () => {
    // State
    const [lists, setLists] = useState([]);

    // Side Effects
    useEffect(() => {
        async function getLists() {
            const listsRes = await PomodoroAPI.getLists();
            setLists(listsRes);
        }
        getLists();
    }, []);

    // Helper Functions
    const search = async (name) => {
        const listsRes = await PomodoroAPI.findLists(name);
        setLists(listsRes);
    };

    // Render
    return (
        <div className="Lists">
            <h1 className="Lists-title">Lists</h1>
            <SearchBar search={search} />

            <div className="Lists-lists">
                {lists.map(list => (
                    <ListCard key={list.id} list={list} />
                ))}
            </div>
        </div>
    )
};

// Exports
export default Lists;