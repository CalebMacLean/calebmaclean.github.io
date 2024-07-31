// Imports
import React, {useState, useEffect} from 'react';

import PomodoroAPI from './PomodoroAPI';
import ListNewForm from './ListNewForm';
import ListChooseForm from './ListChooseForm';

/** ListFormWrapper Component */

const ListFormWrapper = ({username, setActiveList }) => {
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
                    <button onClick={handleCreateListClick}>Create List</button>

                    <button onClick={handleChooseListClick}>Choose List</button>
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
};

// Exports
export default ListFormWrapper;