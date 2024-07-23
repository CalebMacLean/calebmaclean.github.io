// Enable strict mode to avoid common mistakes
"use strict";

/** Declares all routes for /users */
// Imports
const jsonschema = require("jsonschema");
const express = require("express");
const { ensureAdmin, ensureCorrectUserOrAdmin, ensureLoggedIn } = require("../middleware/auth");
const { BadRequestError } = require("../expressError");
const User = require("../models/user");
const { createToken } = require("../helpers/tokens");
const userNewSchema = require("../schemas/userNew.json");
const userUpdateSchema = require("../schemas/userUpdate.json");

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
router.post("/", ensureAdmin, async function (req, res, next) {
    try {
        // validate that request follows userNewSchema
        const validator = jsonschema.validate(req.body, userNewSchema);
        if (!validator.valid) {
            const errs = validator.errors.map(e => e.stack);
            throw new BadRequestError(errs);
        }

        // register new user with request payload
        console.log("Registering user with payload:", req.body);
        const user = await User.register(req.body);
        console.log("User registered successfully:", user);
        const token = createToken(user);
        console.log("Token created successfully: ", token);

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
router.get("/", ensureAdmin, async function (req, res, next) {
    try {
        // Get users from database with User.findAll
        const users = await User.findAll();
        return res.json({ users });
    }
    catch (err) {
        return next(err);
    }
});

/** GET /[username] => { user }
 *
 * Returns { username, firstName, lastName, isAdmin, jobs }
 *   where jobs is { id, title, companyHandle, companyName, state }
 *
 * Authorization required: admin or same user-as-:username
 **/

router.get("/:username", ensureCorrectUserOrAdmin, async function (req, res, next) {
    try {
        // Get user from database with route variable username
        const user = await User.get(req.params.username);
        return res.json({ user });
    } catch (err) {
        return next(err);
    }
});

/** PATCH /[username] { user } => { user }
 *
 * Data can include:
 *   { firstName, lastName, password, email }
 *
 * Returns { username, firstName, lastName, email, isAdmin }
 *
 * Authorization required: admin or same-user-as-:username
 **/

router.patch("/:username", ensureCorrectUserOrAdmin, async function (req, res, next) {
    try {
        // validate with jsonschema userUpdateSchema
        const validator = jsonschema.validate(req.body, userUpdateSchema);

        // In case of invalid, throw a BadRequestError with all validator errs included.
        if (!validator.valid) {
            const errs = validator.errors.map(e => e.stack);
            throw new BadRequestError(errs);
        }

        // Use User.update to patch the user's data in the database.
        const user = await User.update(req.params.username, req.body);
        // Return a jsonified response with the user object.
        return res.json({ user });
    } catch (err) {
        return next(err);
    }
});

/** PATCH /[username]/increment { user } => { user }
 *
 * No data necessary
 *
 * Returns { username, firstName, lastName, email, isAdmin }
 *
 * Authorization required: admin or same-user-as-:username
 **/

router.patch("/:username/increment", ensureCorrectUserOrAdmin, async function (req, res, next) {
    try {
        // validate with jsonschema userUpdateSchema
        const validator = jsonschema.validate(req.body, userUpdateSchema);

        // In case of invalid, throw a BadRequestError with all validator errs included.
        if (!validator.valid) {
            const errs = validator.errors.map(e => e.stack);
            throw new BadRequestError(errs);
        }

        // Use User.update to patch the user's data in the database.
        const user = await User.incrementPomodoros(req.params.username);
        // Return a jsonified response with the user object.
        return res.json({ user });
    } catch (err) {
        return next(err);
    }
});

/** DELETE /[username]  =>  { deleted: username }
 *
 * Authorization required: admin or same-user-as-:username
 **/

router.delete("/:username", ensureCorrectUserOrAdmin, async function (req, res, next) {
  try {
    await User.remove(req.params.username);
    return res.json({ deleted: req.params.username });
  } catch (err) {
    return next(err);
  }
});

// Exports
module.exports = router;