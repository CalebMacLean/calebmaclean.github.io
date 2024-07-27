// Imports
import React from 'react';
import { Route, Routes } from 'react-router-dom';

import Home from './Home';
import NotFound from './NotFound';

/** RouteList Component
 * 
 * This component is responsible for providing the routes for the application.
 * 
 * Props: none
 * 
 * State: none
 */
const RouterList = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path='*' element={<NotFound />} />
        </Routes>
    )
};

// Exports
export default RouterList;