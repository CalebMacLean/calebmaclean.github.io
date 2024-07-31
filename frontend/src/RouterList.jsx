// Imports
import React from 'react';
import { Route, Routes } from 'react-router-dom';

import Home from './Home';
import NotFound from './NotFound';
import LogIn from './LogIn';
import Logout from './Logout';
import Signup from './Signup';
import Profile from './Profile';
import UserList from './UserList';
import UserDetail from './UserDetail';
import Lists from './Lists';
import ListDetail from './ListDetail';

/** RouteList Component
 * 
 * This component is responsible for providing the routes for the application.
 * 
 * Props: none
 * 
 * State: none
 */
const RouterList = ({ activeList, setActiveList, activeTask, setActiveTask }) => {
    return (
        <Routes>
            {/* Home Page */}
            <Route path="/" element={
                <Home 
                    activeList={activeList} 
                    activeTask={activeTask} 
                    setActiveTask={setActiveTask} 
                    setActiveList={setActiveList}/>} 
            />
            {/* Log In Form */}
            <Route path="/login" element={<LogIn />} />
            {/* Log Out Feature */}
            <Route path="/logout" element={<Logout />} />
            {/* Sign Up Form */}
            <Route path="/signup" element={<Signup />} />
            {/* Profile Page */}
            <Route path="/profile" element={<Profile />} />
            {/* Users Page */}
            <Route path="/users" element={<UserList />} />
            {/* User Page */}
            <Route path="/users/:username" element={<UserDetail />} />
            {/* Lists Page */}
            <Route path="/lists" element={<Lists />} />
            {/* List Page */}
            <Route path="/lists/:id" element={<ListDetail />} />
            {/* Not Found Page */}
            <Route path='*' element={<NotFound />} />
        </Routes>
    )
};

// Exports
export default RouterList;