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

        console.log("GET user: ", user);
        
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
}

// Exports
module.exports = User;