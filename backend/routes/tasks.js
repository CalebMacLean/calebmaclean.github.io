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
const Task = require("../models/task");
const taskNewSchema = require("../schemas/taskNewSchema.json");
const taskUpdateSchema = require("../schemas/taskUpdate.json");

const router = express.Router({mergeParams: true});

// Routes
/** POST lists/:listId/tasks
 * Create a new task for a list
 * 
 * Data includes {title, listId, expectedPomodoros, completedCycles, completedStatus }
 * 
 * Returns {task: {id, title, listId, expectedPomodoros, completedCycles, completedStatus}}
 * 
 * Authorization: correct user or admin
 */
router.post("/", ensureLoggedIn, async (req, res, next) => {
    try {
        // validate request with taskNewSchema
        const validator = jsonschema.validate(req.body, taskNewSchema);
        if( !validator.valid ) {
            const errs = validator.errors.map(e => e.stack);
            throw new BadRequestError(errs);
        }

        const task = await Task.add(req.body);

        return res.status(201).json({ task });
    }
    catch (err) {
        return next(err);
    }
})

/** GET lists/:listId/tasks
 * Get all tasks for a list
 * 
 * Returns {tasks: [{id, title, listId, expectedPomodoros, completedCycles, completedStatus}, ...]
 * 
 * Authorization: correct user or admin
 */
router.get("/", ensureLoggedIn, async (req, res, next) => {
    try {
        const tasks = await Task.getTasksByList(req.params.listId);
        console.log("route tasks: ", tasks);
        return res.json({ tasks });
    }
    catch (err) {
        return next(err);
    }
});

/** GET lists/:listId/tasks/:id
 * Get a task
 * 
 * Returns {task: {id, title, listId, expectedPomodoros, completedCycles, completedStatus}}
 * 
 * Authorization: correct user or admin
 */
router.get("/:id", ensureLoggedIn, async (req, res, next) => {
    try {
        const task = await Task.get(req.params.id);

        return res.json({ task });
    }
    catch (err) {
        return next(err);
    }
});

/** PATCH lists/:listId/tasks/:id
 * Update a task
 * 
 * Returns {task: {id, title, listId, expectedPomodoros, completedCycles, completedStatus}}
 * 
 * Authorization: correct user or admin
 */
router.patch("/:id", ensureLoggedIn, async (req, res, next) => {
    try {
        // validate request with taskUpdateSchema
        const validator = jsonschema.validate(req.body, taskUpdateSchema);
        if( !validator.valid ) {
            const errs = validator.errors.map(e => e.stack);
            throw new BadRequestError(errs);
        }

        // console.log("PATCH req.params: ", req.params);
        const task = await Task.update(req.params.id, req.body);

        return res.json({ task });
    }
    catch (err) {
        return next(err);
    }
});

/** PATCH lists/:listId/tasks/:id/increment
 * Update a task's completedCycles
 * 
 * Returns {task: {id, title, listId, expectedPomodoros, completedCycles, completedStatus}}
 * 
 * Authorization: correct user or admin
 */
router.patch("/:id/increment", ensureLoggedIn, async (req, res, next) => {
    try {
        // validate request with taskUpdateSchema
        const validator = jsonschema.validate(req.body, taskUpdateSchema);
        if( !validator.valid ) {
            const errs = validator.errors.map(e => e.stack);
            throw new BadRequestError(errs);
        }

        const task = await Task.incrementCycles(req.params.id);

        return res.json({ task });
    }
    catch (err) {
        return next(err);
    }
});

/** DELETE /lists/:listId/tasks/:id
 * Removes a task or tasks from the database
 * 
 * Data doneTasks: [id, id, ...]
 * 
 * Returns { deleted: [id, id]}
 * 
 * Auth: loggedIn
 */
router.delete("/remove", ensureLoggedIn, async (req, res, next) => {
    try {

        const ids = await Task.removeGroup(req.body.ids);
        // console.log("ids: ", ids);
        return res.json({ deleted: req.body.ids })
    }
    catch (err) {
        return next(err);
    }
})
// Exports
module.exports = router;