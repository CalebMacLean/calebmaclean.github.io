// Enable strict mode
"use strict";

/** Routes for authentication */
// Imports
const jsonschema = require("jsonschema");
const User = require("../models/user");
const express = require("express");
const router = new express.Router();
const { createToken } = require("../helpers/tokens");
const userAuthSchema = require("../schemas/userAuth.json");
const userRegisterSchema = require("../schemas/userRegister.json");
const { BadRequestError } = require("../expressError");

/** POST /auth/token: { username, password } => { token } 
 * 
 * Returns JWT token which will be used to authorize other request.
 * 
 * Authorization required: none
*/
router.post("/token", async function(req, res, next) {
    try {
        // check request follows userAuthSchema constraints
        const validator = jsonschema.validate(req.body, userAuthSchema);
        if( !validator.valid ) {
            // if constraints are broken gather all errors and pass them as BadRequestError
            const errs = validator.errors.map(e => e.stack);
            throw new BadRequestError(errs)
        }

        // deconstruct username and password
        const { username, password } = req.body;
        // use vars to authenticate user
        const user = await User.authenticate(username, password);
        // create/return token using returned user obj
        const token = createToken(user);
        return res.json({ token });
    }
    catch (err) {
        return next(err);
    }
});

/** POST /auth/register: { user } => { token }
 * 
 * user must include { username, password, firstName, lastName, email }
 * 
 * Returns JWT token which can be used to authenticate further requests.
 * 
 * Authorization required: none
 */
router.post("/register", async function (req, res, next) {
    try {
        // ensure request follows userRegisterSchema
        const validator = jsonschema.validate(req.body, userRegisterSchema);
        if( !validator.valid ) {
            const errs = validator.errors.map(e => e.stack);
            throw new BadRequestError(errs);
        }

        // register a new user, ensure that admins aren't created this way
        const newUser = await User.register({ ...req.body, isAdmin: false });
        // create and return token
        const token = createToken(newUser);
        return res.status(201).json({ token });
    }
    catch (err) {
        return next(err);
    }
})

// Exports
module.exports = router;