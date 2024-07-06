// Enable strict mode to avoid common mistakes
"use strict";

/** Declares all routes for /users */
// Imports
const express = require("express");

const router = express.Router();

// Routes
/** POST / { user } => { user, token } 
 * 
 * Adds a new user. This is only for admins to add new users, and the new user can be an admin unlike the registration endpoint.
 * 
 * Returns: the newly created user and an authentication token for them: {user: {username, firstName, lastName, email, avatar, numPomodoros, isAdmin}, token}
 * 
 * Authorization: admin
*/
router.post("/", async function (req, res, next) {
    try {
        // extract vars from body
        const { user, token } = req.body;


        // Will need to add JSONschema validation, functionality to actually register the user, and add error handling.


        // return json of user and token with a status code of 201
        return res.status(201).json({ user, token });
    }
    catch (err) {
        return next(err);
    }
})

/** GET / => { users: [{ username, firstName, lastName, email, avatar, numPomodoros, isAdmin}, ...]} 
 * 
 * Returns list of all users.
 * 
 * Authorization: admin
*/
router.get("/", async function (req, res, next) {
    try{
        
    }
    catch (err) {
        return next(err);
    }
})

// Exports
module.exports = router;