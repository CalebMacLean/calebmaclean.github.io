"use strict";

/** Declares all routes for /lists */
// Imports
const jsonschema = require("jsonschema");
const express = require("express");

const {
    ensureAdmin,
    ensureCorrectUserOrAdmin,
    ensureLoggedIn
} = require("../middleware/auth");
const { BadRequestError } = require("../expressError");
const List = require("../models/list");
const listNewSchema = require("../schemas/listNew.json");

const router = express.Router();

// Routes
/**  POST /lists
 * Creates a new list in lists column of database.
 * 
 * Data can include: { title, username, listType, expiresAt }
 * 
 * Returns: {list: {id, title, username, listType, createdAt, expiresAt }}
 * 
 * Authorization: Admin or correct user
*/
router.post("/", ensureCorrectUserOrAdmin, async (req, res, next) => {
    try{
        // validate that request follows listNewSchema
        const validator = jsonschema.validate(req.body, listNewSchema);
        if( !validator.valid ) {
            const errs = validator.errors.map(e => e.stack);
            throw new BadRequestError(errs);
        }

        // create new list with req.body data
        const list = await List.add(req.body);

        // return json of list object with a 201 status code
        return res.status(201).json({ list });
    }
    catch (err) {
        return next(err);
    }
})

// Exports
module.exports = router;