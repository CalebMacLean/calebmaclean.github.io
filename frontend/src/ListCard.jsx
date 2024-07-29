// Imports
import React from 'react';
import { Link } from 'react-router-dom';

/** ListCard Component
 * 
 * This component is responsible for rendering a list card. It provides a link to the list's detail page.
 * 
 * Props:
 * - list: object like { id, title, listType, username }
 * 
 * State: none
 */
const ListCard = ({ list }) => {
    const type = list.listType ? "Focus" : "Break";
    // Render
    return (
        <div className="ListCard">
            <Link to={`/lists/${list.id}`}>
                <h3>{list.title}</h3>
                <p>List Type: {type}</p>
            </Link>
        </div>
    );
}

// Exports
export default ListCard;