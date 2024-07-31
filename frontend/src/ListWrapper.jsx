// Imports
import React, { useState } from 'react';

import ListFormWrapper from './ListFormWrapper';
import ListActive from './ListActive';

/** ListWorking Component
 * 
 * This component is responsible for rendering the list of tasks that are currently being worked on.
 * 
 * Props:
 * - activeList: object like { id, name, tasks }
 * - setActiveList: function to set the root state var activeList
 * 
 * State:
 * - tasks: array of task objects like { id, name, pomodoros, completed, list_id }
 */
const ListWrapper = ({ username, activeList, setActiveList }) => {
    // State
    const [tasks, setTasks] = useState([]);
    const [completedTasks, setCompletedTasks] = useState([]);
    const [showCreateTask, setShowCreateTask] = useState(false);
    
    // Render
    return (
        <div className='ListWrapper'>
            {/* If no active list render ListFormWrapper */}
            { !activeList ? (
                <ListFormWrapper username={username} setActiveList={setActiveList} />
            ) : (
                <ListActive activeList={activeList} />
            )}
        </div>
    )
};

// Exports
export default ListWrapper;