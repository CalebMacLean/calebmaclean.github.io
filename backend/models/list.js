// Enable strict mode to avoid common mistakes
"use strict";

// Imports
const db = require("../db");
const {
    NotFoundError,
    BadRequestError,
    UnauthorizedError
} = require("../expressError");
const { sqlForPartialUpdate, sqlForPartialInsert } = require("../helpers/sql.js");

/** Related Functions for lists */
class List {
    /** add class method
     * adds list with a userId, title, and listType
     * 
     * Returns { id, title, listType, createdAt, expiredAt }
     * 
     * Throws BadRequestError if no username passed
     */
    static async add(username, data) {
        // check that a username was given, other columns have default values
        if ( !username ) throw new BadRequestError('No username');

        // access keys of data
        const keys = Object.keys(data);
        // If no data throw BadRequestError
        if( keys.length === 0 ) throw new BadRequestError('No data');

        // use sqlForPartialInsert to create values and columns for INSERT query
        const { insertColumns, valuesIndecies, values } = sqlForPartialInsert(
            data,
            {
                listType: "list_type",
                createdAt: "created_at",
                expiredAt: "expired_at"
            }
        );

        // add a index for username
        const usernameVarIdx = "$" + (values.length + 1);

        // make query string
        const queryString = `
            INSERT INTO lists
                (${insertColumns}, username)
            VALUES
                (${valuesIndecies}, ${usernameVarIdx})
            RETURNING
                id,
                title,
                username,
                list_type AS "listType",
                created_at AS "createdAt",
                expired_at AS "expiredAt"`;

        // try to insert new list to lists table
        const result = await db.query(queryString, [...values, username]);
        
        return result.rows[0];   
    }

    /** update class method
     * Updates a list entry in the database.
     * 
     * Parameters:
     * id: int - valid list id
     * data: obj - contains fields:newVals
     * 
     * Returns { id, title, listType, createdAt, expiredAt }
     * 
     * Throws BadRequestError if no update data is passed
     */
    static async update(id, data) {
        // Access keys of data obj
        const keys = Object.keys(data);
        // if no data throw BadRequestError
        if( keys.length === 0 ) throw new BadRequestError("No data");

        // use sqlForPartialUpdate to convert fields to column names
        const { setCols, values } = sqlForPartialUpdate(
            data,
            {
                listType: "list_type",
                createdAt: 'created_at',
                expiredAt: "expired_at"
            }
        );

        // // add an index for the username
        // const usernameVarIdx = "$" + (values.length + 1);

        // make query string for update statement
        const querySQL = `UPDATE lists
                          SET ${setCols}
                          WHERE id = ${id}
                          RETURNING id,
                                    title,
                                    list_type AS "listType",
                                    created_at AS "createdAt",
                                    expired_at AS "expiredAt"`;
        
        // make query to database store results in var
        const result = await db.query(querySQL, [...values]);
        const list = result.rows[0];

        // check for user
        if( !list ) throw new NotFoundError(`List not found`);

        return list;
    }
}

// Exports
module.exports = List;