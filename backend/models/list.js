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
     * Returns { id, title, listType, createdAt, expiresAt }
     * 
     * Throws BadRequestError if no username passed
     */
    static async add(data = {}) {

        console.log("data before username removed: ", data);
        // access username
        const { username } = data;
        // check that a username was given, other columns have default values
        if ( !username ) throw new BadRequestError('No username');
        // remove username from data
        delete data.username;

        // console.log("data", data);

        // access keys of data
        const keys = Object.keys(data);

        // If no data throw BadRequestError
        if( keys.length === 0 ) throw new BadRequestError('No data');


        // console.log('expiresAt before conversion: ', data.expiresAt);
        
        // If expiresAt convert to string
        if( data.expiresAt ) {
            data.expiresAt = new Date(data.expiresAt);
            console.log('expiresAt after conversion: ', data.expiresAt);
        }

        // use sqlForPartialInsert to create values and columns for INSERT query
        let { insertColumns, valuesIndecies, values } = sqlForPartialInsert(
            data,
            {
                listType: "list_type",
                createdAt: "created_at",
                expiresAt: "expires_at"
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
                expires_at AS "expiresAt"`;

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
     * Returns { id, title, listType, createdAt, expiresAt }
     * 
     * Throws BadRequestError if no update data is passed
     */
    static async update(id, data = {}) {
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
                expiresAt: "expires_at"
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
                                    expires_at AS "expiresAt"`;
        
        // make query to database store results in var
        const result = await db.query(querySQL, [...values]);
        const list = result.rows[0];

        // check for user
        if( !list ) throw new NotFoundError(`List not found`);

        return list;
    }

    /** get class method
     * Gets a list from the database
     * 
     * Parameters:
     * -id: int - valid list id
     * 
     * Returns: {id, title, listType, createdAt, expiresAt}
     * 
     * Throws NotFoundError if list id is invalid
     */
    static async get(id) {
        // search lists table for id
        const result = await db.query(`
            SELECT id,
                   title,
                   list_type AS "listType",
                   created_at AS "createdAt",
                   expires_at AS "expiresAt"
            FROM lists
            WHERE id = $1`,
            [id]
        );

        // store results
        const list = result.rows[0];

        // throw error if there is no list
        if( !list ) throw new NotFoundError(`No list at: ${id}`);

        const tasks = await db.query(`
            SELECT id,
                title,
                expected_pomodoros AS "expectedPomodoros",
                completed_cycles AS "completedCycles",
                completed_status AS "completedStatus"
            FROM tasks
            WHERE list_id = $1`,
        [list.id]);

        list.tasks = tasks.rows;
        // else return list
        return list;
    }

    /** findAll class method
     * Finds all of the list in the database.
     * 
     * Parameters: none
     * 
     * Returns: [{id, title, listType, createdAt, expiresAt}, ...]
     */
    static async findAll(searchFilter = {}) {
        let query = `
            SELECT id,
                   title,
                   list_type AS "listType",
                   created_at AS "createdAt",
                   expires_at AS "expiresAt"
            FROM lists`;
        let whereExpressions = [];
        let queryValues = [];

        const { nameLike } = searchFilter;
        if( nameLike ) {
            queryValues.push(`%${nameLike}%`);
            whereExpressions.push(`title ILIKE $${queryValues.length}`);
        }

        if( whereExpressions.length > 0) {
            query += " WHERE " + whereExpressions.join(" AND ");
        }

        query += " ORDER BY title";
        console.log("query: ", query);
        console.log("queryValues: ", queryValues);
        const result = await db.query(query, queryValues);

        return result.rows;
    }

    /** remove class method
     * Deletes a give list from database.
     * 
     * Parameters:
     * id: int - valid list id.
     * 
     * Returns: undefined
     * 
     * Throws NotFoundError if no list is found.
     */
    static async remove(id) {
        // make DELETE query to database
        const query = await db.query(`
            DELETE
            FROM lists
            WHERE id = $1
            RETURNING id`,
            [id]
        );

        // check that query was successful
    if( !query.rows[0] ) throw new NotFoundError(`No list: ${id}`);
    }

    /** removeExpired class method
     * checks if a list object is expired and removes it if so.
     * 
     * Parameters:
     * list: obj - { id, title, listType, createdAt, expiresAt }
     * 
     * Returns: undefined
     * 
     * Throws BadRequestError if no id, createdAt, or expiresAt in list object
     */
    static async removeExpired(list = {}) {
        // check that list has necessary properties
        if( !list.id ) throw new BadRequestError(`No id`);
        if( !list.expiresAt ) throw new BadRequestError(`No expiresAt property`);

        // check if expired date is passed
        const currentDate = new Date();
        const expiredDate = list.expiresAt;

        if( expiredDate < currentDate ) {
            try{
                await this.remove(list.id);
            } 
            catch (err) {
                throw BadRequestError(`Failed to remove list with id: ${list.id}`);
            }
        }
    }
}

// Exports
module.exports = List;