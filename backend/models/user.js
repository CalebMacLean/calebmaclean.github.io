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
     * 
     * authenticates user with username, password.
     * 
     * Returns { username, first__name, last_name, email, avatar, num_pomodoros, isAdmin}
     * 
     * Throws UnauthorizedError if user not found or wrong password.
     */
    static async authenticate(username, password) {
        // try to find the user first
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


    }
}

// Exports
module.exports = User;