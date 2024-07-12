// Enable strict mode to avoid common mistakes
"use strict";
// Imports
const db = require("../db");
const {
    NotFoundError,
    BadRequestError,
    UnauthorizedError
} = require("../expressError");
const { sqlForPartialUpdate } = require("../helpers/sql");

/** Related Functions for friends */
class Friend {
    /** request class method
     * adds a friend request to the friends table
     * 
     * Returns { sender, reciever, requestStatus }
     */
    static async request(sender, receiver) {
        // make request to the database
        const result = await db.query(`
            INSERT INTO friends
                (sender, receiver, request_status)
            VALUES
                ($1, $2, $3)
            RETURNING sender,
                      receiver,
                      request_status AS "requestStatus"`,
            [sender, receiver, false]
        );
        
        return result.rows[0];
    }


}

// Exports
module.exports = Friend;