// Imports
const bcrypt = require("bcrypt");
const db = require("../db.js");
const { BCRYPT_WORK_FACTOR } = require("../config.js");

// Helper Functions
/** commonBeforeAll helper
 * 
 * Will clear tables and insert test data for all model tests.
 */
async function commonBeforeAll() {
    // clear rows in tables
    // noinspection SQLWithoutWhere
    await db.query("DELETE FROM users");
    await db.query("DELETE FROM lists");

    // Reset Primary keys for tables that need it
    await db.query(`ALTER SEQUENCE lists_id_seq RESTART WITH 1`)
    await db.query(`ALTER SEQUENCE tasks_id_seq RESTART WITH 1`)

    // insert values into users, use hashed passwords
    await db.query(`
        INSERT INTO users(
            username,
            password,
            first_name,
            last_name,
            email)
        VALUES 
            ('u1', $1, 'U1F', 'U1L', 'u1@email.com'),
            ('u2', $2, 'U2F', 'U2L', 'u2@email.com'),
            ('u3', $3, 'U3F', 'U3L', 'u3@email.com'),
            ('u4', $4, 'U4F', 'U4L', 'u4@email.com'),
            ('u5', $5, 'U5F', 'U5L', 'u5@email.com')
        RETURNING username`,
        [
            await bcrypt.hash("password1", BCRYPT_WORK_FACTOR),
            await bcrypt.hash("password2", BCRYPT_WORK_FACTOR),
            await bcrypt.hash('password3', BCRYPT_WORK_FACTOR),
            await bcrypt.hash('password4', BCRYPT_WORK_FACTOR),
            await bcrypt.hash('password5', BCRYPT_WORK_FACTOR)
        ]
    );

    // insert values into lists
    await db.query(`
        INSERT INTO lists
            (username)
        VALUES
            ('u1')
        RETURNING id, title`
    );
    await db.query(`
        INSERT INTO lists
            (username, title, list_type, expires_at)
        VALUES
            ('u2', 'expired list', true, '06/12/2023')
        RETURNING id, title`);
    
    // Insert values into friends
    await db.query(`
        INSERT INTO friends
            (sender, receiver, request_status)
        VALUES
            ('u1', 'u2', false),
            ('u3', 'u1', false),
            ('u2', 'u4', true),
            ('u5', 'u2', true)
        RETURNING sender, receiver, request_status`);

    // Insert values into tasks
    await db.query(`
        INSERT INTO tasks
            (title, list_id, expected_pomodoros)
        VALUES
            ('task1', 1, 1),
            ('task2', 1, 2),
            ('task3', 1, 3)
        RETURNING id`);
};

/** commonBeforeEach helper
 * 
 * Starts a new transaction in the database
 */
async function commonBeforeEach() {
    await db.query("BEGIN");
};

/** commonAfterEach helper
 * 
 * Rollsback transaction in the database
 */
async function commonAfterEach() {
    await db.query("ROLLBACK");
};

/** commonAfterAll helper
 * 
 * Ends connection to the database.
 */
async function commonAfterAll() {
    await db.end();
};

// Exports
module.exports = {
    commonBeforeAll,
    commonBeforeEach,
    commonAfterEach,
    commonAfterAll
}