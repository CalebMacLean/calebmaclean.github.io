// Enable strict mode to avoid common mistakes
"use strict";
// Imports
const db = require("../db");
const { NotFoundError, BadRequestError } = require("../expressError");
const { sqlForPartialInsert, sqlForPartialUpdate} = require("../helpers/sql");

/** Related query functions for tasks table */
class Task{
    /** add class method
     * Inserts a new task row to the tasks table
     * 
     * Parameters:
     * data: (obj) can include { title, listId, expectedPomodoros }
     * 
     * Returns: { id, title, listId, expectedPomodoros, completedCycles, completedStatus }
     * 
     * Throws BadRequestError if no listId provided
     * Throws BadRequestError if no data provided
     */
    static async add(data={}) {
        // check for data
        if( Object.keys(data).length === 0 ) throw new BadRequestError('No data');
        // check for listId
        if( !data.listId ) throw new BadRequestError('No listId');

        // use sqlForPartialInser to create values and columns for INSERT query
        const { insertColumns, valuesIndecies, values } = sqlForPartialInsert(
            data,
            {
                listId: "list_id",
                expectedPomodoros: "expected_pomodoros"
            }
        );
        
        // make query string
        const queryString = `
            INSERT INTO tasks
                (${insertColumns})
            VALUES
                (${valuesIndecies})
            RETURNING id,
                title,
                list_id AS "listId",
                expected_pomodoros AS "expectedPomodoros",
                completed_cycles AS "completedCycles",
                completed_status AS "completedStatus"`;
        
        // query with query string
        const result = await db.query(queryString, [...values]);

        return result.rows[0];
    }
};

// Exports
module.exports = Task;