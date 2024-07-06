// Enable strict mode to avoid common mistakes
"use strict";
// Imports
const db = require("../db");
const bcrypt = require("bcrypt");
const {
    NotFoundError,
    BadRequestError,
    UnauthorizedError
} = require("../expressError");
const { BCRYPT_WORK_FACTOR } = require("../config");

/** Related Functions for users */
class User {
    /** authenticate class method
     * authenticates user with username, password.
     * 
     * Returns { username, first__name, last_name, email, avatar, num_pomodoros, isAdmin}
     * 
     * Throws UnauthorizedError if user not found or wrong password.
     */
    static async authenticate(username, password) {
        // try to find the user first, always use SQL query sanitization
        const result = await db.query(
            `
            SELECT username,
                password,
                first_name AS "firstName",
                last_name AS "lastName",
                email,
                avatar,
                num_pomodoros AS "numPomodoros",
                is_admin AS "isAdmin"
            FROM users
            WHERE username = $1
            `, [username],
        );
        // access result's data
        const user = result.rows[0];

        // console.log("GET user: ", user);

        // If there is a user, check passwords validity
        if (user) {
            // create hashed password to compare to user.password
            const isValid = await bcrypt.compare(password, user.password);
            // if password is valid, remove password from user and return
            if (isValid === true) {
                delete user.password;
                return user;
            }
        }

        // If there was no user or valid password throw UnauthorizedError
        throw new UnauthorizedError("Invalid username/password");
    }

    /** register class method
     * Registers user with data.
     * 
     * Returns { username, firstName, lastName, email, avatar, numPomodoros, isAdmin }
     * 
     * Throws BadRequestError on duplicates.
     */
    static async register({ username, password, firstName, lastName, email, avatar, isAdmin}) {
        // Query database using attempted username
        const duplicateCheck = await db.query(
            `SELECT username
             FROM users
             WHERE username = $1`,
            [username]
        );
        // Throw error if this registration would create a duplicate
        if( duplicateCheck.rows[0] ) {
            throw new BadRequestError(`Duplicate username: ${username}`)
        }

        // If not a duplicate hash password
        const hashedPassword = await bcrypt.hash(password, BCRYPT_WORK_FACTOR);

        // If no avatar use default profile picture
        const profilePic = avatar ? avatar : 'assets/default_pfp.jpg';

        // Insert user data to the user table
        const result = await db.query(
            `INSERT INTO users 
                (username, password, first_name, last_name, email, avatar, is_admin)
             VALUES
                ($1, $2, $3, $4, $5, $6, $7)
             RETURNING
                username, first_name AS "firstName", last_name AS "lastName", email, avatar, num_pomodoros AS "numPomodoros", is_admin AS "isAdmin"`,
            [
                username,
                hashedPassword,
                firstName,
                lastName,
                email,
                profilePic,
                isAdmin
            ]
        );

        // return rows of result as user
        const user = result.rows[0];

        console.log("Registered User: ", user);

        return user;
    }

    /** findAll class method
     * Finds all users
     * 
     * Returns [{ username, firstName, lastName, email, avatar, numPomodoros, isAdmin }, ...]
     */
    static async findAll() {
        // SELECT all users in users table
        const result = await db.query(`
            SELECT username,
                   first_name AS "firstName",
                   last_name AS "lastName",
                   email,
                   avatar,
                   num_pomodoros AS "numPomodoros",
                   is_admin AS "isAdmin"
            FROM users
            ORDER BY username`
        );

        return result.rows;
    }

    /** get class method
     * Given a username, return data about user.
     * 
     * Returns: { username, firstName, lastName, email, avatar, numPomodoros,isAdmin, }
     * 
     * Throws NotFoundError if user is not found
     */
    static async get(username) {
        // Search users table with username
        const result = await db.query(`
            SELECT username,
                   first_name AS "firstName",
                   last_name AS "lastName",
                   email,
                   avatar,
                   num_pomodoros AS "numPomodoros",
                   is_admin AS "isAdmin"
            FROM users
            WHERE username = $1`,
            [username]
        );

        // store results
        const user = result.rows[0];

        // if no user throw error
        if( !user ) throw new NotFoundError(`No user: ${username}`);

        // else return user
        return user;
    }

    /** update class method
     * Update user data with 'data'.
     * This is a partial update --- it's fine if data doesn't contain all of the fields; this only changes provided ones.
     * 
     * Data can include: { firstName, lastName, password, email, avatar, numPomodoros, isAdmin }
     * 
     * Returns: { username, firstName, lastName, email, avatar, numPomodoros, isAdmin }
     * 
     * Throws NotFoundError if not found.
     * 
     * WARNING: this function can set a new password or make a user an admin.
     */
    static async update(username, data) {
        // hash password if present
        if( data.password ) {
            data.password = await bcrypt.hash(data.password, BCRYPT_WORK_FACTOR);
        }

        // Access Keys of data
        const keys = Object.keys(data);
        // if no data throw BadRequestError
        if( keys.length === 0 ) throw new BadRequestError("No data");

        // js to sql conversion object
        const userFields = {
            firstName: 'first_name',
            lastName: 'last_name',
            numPomodoros: 'num_pomodoros',
            isAdmin: 'is_admin'
        }

        // for each key create a sanitized sql statement
        const cols = keys.map((colName, idx) => `"${userFields[colName] || colName}"=$${idx+1}`
        );

        // create sql query string
        const fields = cols.join(", ");
        // get data values
        const values = Object.values(data);

        // add a index for username
        const usernameVarIdx = "$" + (values.length - 1);

        // Make query string for database
        const querySQL = `UPDATE users
                          SET ${fields}
                          WHERE username = ${usernameVarIdx}
                          RETURNING username,
                                    first_name AS "firstName",
                                    last_name AS "lastName",
                                    email,
                                    avatar,
                                    num_pomodoros AS "numPomodoros",
                                    is_admin AS "isAdmin"`;

        // Make query with query string and values
        const result = await db.query(querySQL, [...values, username]);
        const user = result.rows[0];

        // throw error if no user
        if( !user ) throw new NotFoundError(`No user: ${username}`);

        delete user.password;
        return user;
    }
}

// Exports
module.exports = User;