// Imports
import React, { useState, useEffect } from 'react';

import PomodoroAPI from './PomodoroAPI';
import ListNewForm from './ListNewForm';
import ListChooseForm from './ListChooseForm';
import './ListFormWrapper.css';
/** ListFormWrapper Component */

const ListFormWrapper = ({ username, setActiveList }) => {
    // State
    // stores the lists that the user has created
    const [lists, setLists] = useState([]);
    // tracks whether the user is creating a new list
    const [showCreateListForm, setShowCreateListForm] = useState(false);
    // tracks whether the user is choosing an existing list
    const [showChooseListForm, setShowChooseListForm] = useState(false);

    // Effects
    // Effects
    useEffect(() => {
        async function getLists(username) {
            try {
                if (username) {
                    console.log("Getting lists for user: ", username);
                    let listsRes = await PomodoroAPI.getLists(username);
                    setLists(listsRes);
                }
            }
            catch (err) {
                console.error(err);
            }
        }
        getLists(username);
    }, []);

    // Event Handlers
    const handleCreateListClick = async () => {
        setShowCreateListForm(true);
    }

    const handleChooseListClick = async () => {
        setShowChooseListForm(true);
    }

    // Conditional Variables
    const hasNoActiveForm = !showCreateListForm && !showChooseListForm;
    const isOnlyCreateListForm = showCreateListForm && !showChooseListForm;
    const isOnlyChooseListForm = !showCreateListForm && showChooseListForm;
    // Render
    return (
        <div className="ListFormWrapper">
            {/* If a form is inactive show both form buttons */}
            { hasNoActiveForm ? (
                <>
                    <button className="btn btn-sm btn-secondary" onClick={handleCreateListClick}>Create List</button>

                    <button className="btn btn-sm btn-secondary" onClick={handleChooseListClick}>Choose List</button>
                </>
            ) : null 
            }
            {/* If a form is active then the other form shouldn't be */}
            { isOnlyCreateListForm ? (
                <ListNewForm 
                    username={username}
                    setShowCreateList={setShowCreateListForm} 
                    setActiveList={setActiveList} 
                />
            ) : null
            }
            { isOnlyChooseListForm ? (
                <ListChooseForm 
                    lists={lists} 
                    setActiveList={setActiveList} 
                    setShowChooseList={setShowChooseListForm} 
                />
            ) : null
            }
        </div>
    )
//     return (
//         <div className="container mt-5 w-100">
//             <div className="row justify-content-center">
//                 <div className="col-md-10">
//                     <div className="card">
//                         <div className="card-body">
//                             <div className="ListFormWrapper">
//                                 {/* If a form is inactive show both form buttons */}
//                                 {hasNoActiveForm ? (
//                                     <div className="d-flex justify-content-between mb-3">
//                                         <button className="btn btn-primary" onClick={handleCreateListClick}>Create List</button>
//                                         <button className="btn btn-secondary" onClick={handleChooseListClick}>Choose List</button>
//                                     </div>
//                                 ) : null}
//                                 {/* If a form is active then the other form shouldn't be */}
//                                 {isOnlyCreateListForm ? (
//                                     <ListNewForm
//                                         username={username}
//                                         setShowCreateList={setShowCreateListForm}
//                                         setActiveList={setActiveList}
//                                     />
//                                 ) : null}
//                                 {isOnlyChooseListForm ? (
//                                     <ListChooseForm
//                                         lists={lists}
//                                         setActiveList={setActiveList}
//                                         setShowChooseList={setShowChooseListForm}
//                                     />
//                                 ) : null}
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     )
};

// Exports
export default ListFormWrapper;