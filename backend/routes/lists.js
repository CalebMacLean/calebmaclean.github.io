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
const listUpdateSchema = require("../schemas/listUpdate.json");
const listSearchSchema = require("../schemas/listSearch.json");
const taskRoutes = require("./tasks");

const router = express.Router();
router.use("/:listId/tasks", taskRoutes);
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
});

/** GET /
 * Retrieves all lists with an id
 * 
 * No data needed
 * 
 * Returns { lists: { id, username, title, listType, createdAt, expiresAt }}
 * 
 * Authorization: logged in user or admin
 */
router.get("/", async (req, res, next) => {
    const q = req.query;
    try {
        const validator = jsonschema.validate(q, listSearchSchema);
        if( !validator.valid ) {
            const errs = validator.errors.map(e => e.stack);
            throw new BadRequestError(errs);
        }

        const lists = await List.findAll(q);
        return res.json({ lists });
    }
    catch (err) {
        return next(err);
    }
});

/** PATCH /lists/:id
 * Updates a list with an id
 * 
 * Data can include { title, listType, expiresAt }
 * 
 * Returns { list: { id, username, title, listType, createdAt, expiresAt }}
 * 
 * Authorization: Admin or correct user
 */
router.patch("/:id", ensureCorrectUserOrAdmin, async (req, res, next) => {
    try {
        // validate that the request follows listUpdateSchema
        const validator = jsonschema.validate(req.body, listUpdateSchema);
        if( !validator.valid ) {
            const errs = validator.errors.map(e => e.stack);
            throw new BadRequestError(errs);
        }

        const list = await List.update(req.params.id, req.body);

        return res.json({ list });
    }
    catch (err) {
        return next(err);
    }
});

/** GET /lists/:id
 * Retrieves a list with an id
 * 
 * No data needed
 * 
 * Returns { list: { id, username, title, listType, createdAt, expiresAt }}
 * 
 * Authorization: Admin or correct user
 */
router.get("/:id", ensureLoggedIn, async (req, res, next) => {
    try {
        const list = await List.get(req.params.id);

        return res.json({ list });
    }
    catch (err) {
        return next(err);
    }
});

/** DELETE /lists/:id
 * Removes a list with an id
 * 
 * No data needed
 * 
 * Returns { message: `${id} removed`}
 * 
 * Authorization: Admin or correct user
 */
router.delete("/:id", ensureCorrectUserOrAdmin, async (req, res, next) => {
    try {
        const id = await List.remove(req.params.id);

        return res.json({ deleted: req.params.id });
    }
    catch (err) {
        return next(err);
    }
});

// Exports
module.exports = router;