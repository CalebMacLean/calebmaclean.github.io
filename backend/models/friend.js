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
     * 
     * Throws BadRequestError without sender or receiver
     */
    static async request(sender, receiver, requestStatus=false) {
        if( !sender || !receiver) throw new BadRequestError("Needs a sender or receiver");
        
        // make request to the database
        const result = await db.query(`
            INSERT INTO friends
                (sender, receiver, request_status)
            VALUES
                ($1, $2, $3)
            RETURNING sender,
                      receiver,
                      request_status AS "requestStatus"`,
            [sender, receiver, requestStatus]
        );
        
        return result.rows[0];
    }

    /** get class method
     * Gets a friend request from the table
     * 
     * Returns: { sender, receiver, requestStatus }
     * 
     * Throws NotFoundError when no match is found
     */
    static async get(sender, receiver) {
        // make query to db
        const result = await db.query(`
            SELECT sender,
                   receiver,
                   request_status AS "requestStatus"
            FROM friends
            WHERE sender = $1 AND receiver = $2`,
            [sender, receiver]
        );

        // check that a result was found
        const friend = result.rows[0];
        if( !friend ) throw new NotFoundError('No friendship found');

        // return result
        return friend;
    }

    /** findAllRequestBySender class method
     * Retrieves all of the pending friend requests a user has made.
     * 
     * Parameters:
     * - sender: (str) valid username in users
     * - status: (bool) boolean to set the requestStatus to in query
     * 
     * Returns: [{ requestStatus, receiver, receiver.avatar
     * reciever.firstName, receiver.lastName }, ...]
     */
    static async findAllRequestBySender(sender, status=false) {
        // make query to database
        const result = await db.query(`
            SELECT f.request_status AS "requestStatus",
                f.receiver AS "username",
                u.avatar,
                u.first_name AS "firstName",
                u.last_name AS "lastName"
            FROM friends f
            JOIN users u ON f.receiver = u.username
            WHERE f.sender = $1 AND f.request_status = $2`,
            [sender, status]
        );

        // else return results
        return result.rows;
    }

    /** findAllRequestByReceiver class method
     * Retrieves all pending requests that have been sent to a user
     * 
     * Parameters:
     * - receiver: (str) valid username
     * 
     * Returns: [{ requestStatus, username, receiver.avatar
     * reciever.firstName, receiver.lastName }, ...]
    */
    static async findAllRequestByReceiver(receiver, status=false) {
        // make query to database
        const result = await db.query(`
            SELECT f.request_status AS "requestStatus",
                f.sender AS "username",
                u.avatar,
                u.first_name AS "firstName",
                u.last_name AS "lastName"
            FROM friends f
            JOIN users u ON f.sender = u.username
            WHERE f.receiver = $1 AND f.request_status = $2`,
            [receiver, status]
        );

        return result.rows;
    }

    /** findAllFriends class method
     * Retrieves all friends a user has
     * 
     * Parameters:
     * user: (str) valid username
     * 
     * Returns: [{requestStatus, username, firstName, lastName, avatar}, ...]
     */
    static async findAllFriends(user) {
        // make a request using findAllRequestBySender
        const senderList = await this.findAllRequestBySender(user, true);
        // make a request using findAllRequestByReciever
        const receiverList = await this.findAllRequestByReceiver(user, true);
        // join list together
        const result = [...(senderList || []), ...(receiverList || [])];

        return result;
    }

    /** acceptRequest class method
     * updates the request status of a row in the friends table
     * 
     * Parameters:
     * sender: (str) valid username
     * receiver: (str) valid username
     * 
     * Returns: {requestStatus, username, firstName, lastName, avatar}
     */
    static async acceptRequest(sender, receiver) {
        // make query
        const result = await db.query(`
            UPDATE friends f
            SET request_status = true
            FROM users u
            WHERE f.sender = $1 AND f.receiver = $2 AND f.sender = u.username
            RETURNING request_status AS "requestStatus",
                sender AS "username",
                first_name AS "firstName",
                last_name AS "lastName"`,
            [sender, receiver]
        );

        return result.rows[0];
    }

    /** remove class method
     * Removes a row from the friends table
     * 
     * Parameters:
     * sender: (str) valid username
     * receiver: (str) valid username
     * 
     * Returns: undefined
     * 
     * Throws NotFoundError if (sender, receiver) primary key doesn't exist
     */
    static async remove(sender, receiver) {
        // make query
        const query = await db.query(`
            DELETE
            FROM friends
            WHERE sender = $1 AND receiver = $2
            RETURNING sender, receiver`,
            [sender, receiver]
        );
        
        // check that the query was successful
        if( query.rows.length === 0 ) throw new NotFoundError(`${sender} to ${receiver} request not found`);
    }
}

// Exports
module.exports = Friend;