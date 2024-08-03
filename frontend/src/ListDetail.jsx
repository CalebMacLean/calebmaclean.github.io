// Imports
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import PomodoroAPI from './PomodoroAPI';
import './ListDetail.css';

/** ListDetail Component
 * 
 * This component is responsible for rendering the details of a list.
 * 
 * Props: none
 * 
 * State:
 * - list: object like { id, title, listType, username }
 * - tasks: (array) list of task objects like { id, title, description, pomodoroEstimate }
 */
const ListDetail = () => {
    // State
    const [list, setList] = useState(null);
    const { id } = useParams();

    // Effects
    useEffect(() => {
        async function getList() {
            const listRes = await PomodoroAPI.getList(id);
            setList(listRes);
        }
        getList();
    }, [id]);

    // Render
    return (
        <div className="ListDetail-wrapper">
            {list ? (
                <div className='ListDetail'>
                    <div className="ListDetail-header">
                        <h3>{list.title}</h3>
                        <p>{list.listType ? "Focus" : "Break"}</p>
                        <p>Created by: {list.username}</p>
                    </div>
                    <div className='ListDetail-main'>
                        <div className="ListDetail-tasks-wrapper">
                            <div className="ListDetail-tasks-header">
                                <h3>Tasks:</h3>
                            </div>
                            <div className="ListDetail-tasks-main">
                                <div className='ListDetail-tasks'>
                                    {list.tasks.map(task => (
                                        <div className='ListDetail-task' key={task.id}>
                                            <h4>{task.title}</h4>
                                            <p>{task.description}</p>
                                            <p>{task.completedCycles}/{task.expectedPomodoros}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    )
};

// Exports
export default ListDetail;