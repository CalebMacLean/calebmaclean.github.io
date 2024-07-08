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
     * Returns {id, title, list_type}
     * 
     * Throws NotFoundError if userId is not found
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

}

// Exports
module.exports = List;