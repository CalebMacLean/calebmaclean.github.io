// Imports
import React, { useState } from 'react';

import ListFormWrapper from './ListFormWrapper';
import ListActive from './ListActive';
import './ListWrapper.css';

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
const ListWrapper = ({ username, activeList, setActiveList, setActiveTask, activeTask, isTimerEnd }) => {

    // Render
    return (
        <div className='ListWrapper'>
            {/* If no active list render ListFormWrapper */}
            {!activeList ? (
                <ListFormWrapper username={username} setActiveList={setActiveList} />
            ) : (
                <div className='ListWrapper-active-wrapper container'>
                    <div className="row">
                        <button className='btn btn-sm btn-secondary col-2' 
                            onClick={(() => setActiveList(null))}> Back </button>
                    </div>
                    <div className="row">
                        <ListActive activeList={activeList}
                            setActiveTask={setActiveTask}
                            activeTask={activeTask}
                            isTimerEnd={isTimerEnd}
                        />
                    </div>
                </div>
            )}
        </div >
    )
    // return (
    //     <div className='container mt-5 w-100'>
    //         <div className='row justify-content-center'>
    //             <div className='col-md-10'>
    //                 <div className='card'>
    //                     <div className='card-body'>
    //                         {/* If no active list render ListFormWrapper */}
    //                         { !activeList ? (
    //                             <ListFormWrapper username={username} setActiveList={setActiveList} />
    //                         ) : (
    //                             <>
    //                                 <div className='d-flex justify-content-between mb-3'>
    //                                     <button className='btn btn-secondary' onClick={() => setActiveList(null)}>Back</button>
    //                                 </div>
    //                                 <ListActive 
    //                                     activeList={activeList} 
    //                                     setActiveTask={setActiveTask} 
    //                                     activeTask={activeTask} 
    //                                     isTimerEnd={isTimerEnd}
    //                                 />
    //                             </>
    //                         )}
    //                     </div>
    //                 </div>
    //             </div>
    //         </div>
    //     </div>
    // );
};

// Exports
export default ListWrapper;