// Enable strict mode to avoid common mistakes
"use strict";
// Imports
const db = require("../db");
const { NotFoundError, BadRequestError } = require("../expressError");
const { sqlForPartialInsert, sqlForPartialUpdate } = require("../helpers/sql");

/** Related query functions for tasks table */
class Task {
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
    static async add(data = {}) {
        // check for data
        if (Object.keys(data).length === 0) throw new BadRequestError('No data');
        // check for listId
        if (!data.listId) throw new BadRequestError('No listId');

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

    /** update class method
     * Updates a task's data
     * 
     * Parameters:
     * - id: (int) valid id
     * - data: (obj) can include: {title, listId, expectedPomodoros, completedCycles, completedStatus}
     * 
     * Returning: {id, title, listId, expectedPomodoros, completedCycles, completedStatus}
     * 
     * Throws NotFoundError if id is invalid.
     * Throws BadRequestError if no data or id is provided.
     */
    static async update(id, data = {}) {
        console.log("Task.update id: ", id);
        console.log("Task.update data: ", data);
        // check for id
        if (!(Number.isInteger(+id))) throw new BadRequestError('No id provided');
        // check for data
        if ((Object.keys(data)).length === 0) throw new BadRequestError('No data');

        // use sqlForPartialUpdate to convert fields and create values' indecies
        const { setCols, values } = sqlForPartialUpdate(
            data,
            {
                listId: "list_id",
                expectedPomodoros: "expected_pomodoros",
                completedCycles: "completed_cycles",
                completedStatus: "completed_status"
            }
        );

        // add a sanitized index for the id
        const idVarIdx = '$' + (values.length + 1);

        // make query string for update statement
        const queryString = `UPDATE tasks
                            SET ${setCols}
                            WHERE id = ${idVarIdx}
                            RETURNING id,
                                title,
                                list_id AS "listId",
                                expected_pomodoros AS "expectedPomodoros",
                                completed_cycles AS "completedCycles",
                                completed_status AS "completedStatus"`;

        // make query to database
        const query = await db.query(queryString, [...values, id]);
        const task = query.rows[0];

        // check for task
        if (!task) throw new NotFoundError(`Task not found`);

        return task;
    }

    /** incrementCycles class method
     * Will increase the completed_cycles by one.
     * 
     * Parameters:
     * - id: int
     * 
     * Returns: obj - {id, title, listId, expectedPomodoros, completedCycles, completedStatus}
     * 
     * Throws not found error if no task is found.
     */
    static async incrementCycles(id) {
        // make an update query that uses set to increase the cycles by 1
        const result = await db.query(`
            UPDATE tasks
            SET completed_cycles = completed_cycles + 1
            WHERE id = $1
            RETURNING id,
                    title,
                    list_id AS "listId",
                    expected_pomodoros AS "expectedPomodoros",
                    completed_cycles AS "completedCycles",
                    completed_status AS "completedStatus"`,
            [id]);

        const updatedTask = result.rows[0];

        // throw error if no user found
        if (!updatedTask) throw new NotFoundError(`No task: ${id}`);

        return updatedTask;
    }

    /** get class method
     * Retrieves a task from the database with an id
     * 
     * Parameters:
     * id: (int) valid id
     * 
     * Returns: {id, title, listId, expectedPomodoros, completedCycles, completedStatus }
     * 
     * Throws NotFoundError if a invalid id is passed
     */
    static async get(id) {
        // query tasks table to find a row with a matching id
        const result = await db.query(`
            SELECT id,
                title,
                list_id AS "listId",
                expected_pomodoros AS "expectedPomodoros",
                completed_cycles AS "completedCycles",
                completed_status AS "completedStatus"
            FROM tasks
            WHERE id = $1`,
            [id]
        );

        // throw errof if no task found
        if (!result.rows[0]) throw new NotFoundError(`No id: ${id}`);
        // else return task
        return result.rows[0];
    }

    /** getTasksByList class method 
     * Retrieves all tasks associated with a listId
     * 
     * Parameters:
     * - listId: (int) valid list id
     * 
     * Returns: [{ id, title, listId, expectedPomodoros, completedCycles, completedStatus }, ...]
     * 
     * Throws NotFoundError with invalid listId
    */
    static async getTasksByList(listId) {
        // make query
        const query = await db.query(`
        SELECT id,
                title,
                list_id AS "listId",
                expected_pomodoros AS "expectedPomodoros",
                completed_cycles AS "completedCycles",
                completed_status AS "completedStatus"
            FROM tasks
            WHERE list_id = $1`,
            [listId]
        );


        // check that the query was successful
        if (query.rows.length === 0) throw new NotFoundError(`No list: ${listId}`);

        return query.rows;
    }

    /** remove class method
     * Deletes a row from the tasks table.
     * 
     * Parameters:
     * - id: (int) valid task id
     * 
     * Returns: undefined
     * 
     * Throws NotFoundError with invalid id
     */
    static async remove(id) {
        // make query store result
        const query = await db.query(`
        DELETE
        FROM tasks
        WHERE id = $1
        RETURNING id`,
            [id]
        )

        // check that query was successful
        if (!(query.rows[0])) throw new NotFoundError(`No id: ${id}`);
    }

    /** removeGroup class method
     * Deletes a group of rows from the tasks table
     * 
     * Parameters:
     * ids: (arr) array of valid task ids
     * 
     * Returns: undefined
     * 
     * Throws BadRequestError with an empty array or a parameter thats not an array
     * 
     * Throws a NotFoundError if query isn't succesful
     */
    static async removeGroup(ids) {
        // ensure parameter is valid
        if (!Array.isArray(ids) || ids.length === 0) throw new BadRequestError('No ids provided');

        // make the query
        const query = await db.query(`
        DELETE FROM tasks
        WHERE id = ANY($1::int[])
        RETURNING id`,
            [ids]
        );

        // check that query was successful
        if (query.rows.length === 0) throw new NotFoundError('No tasks found for provided ids');
    }
};

// Exports
module.exports = Task;