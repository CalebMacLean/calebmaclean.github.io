// Enable Strict mode
"use strict";

/** Declares all routes for /friends */
// Imports
const jsonschema = require("jsonschema");
const express = require("express");
const Friend = require("../models/friend");
const { logParams } = require("../middleware/debug");
const { 
    ensureAdmin, 
    ensureCorrectUserOrAdmin, 
    ensureLoggedIn } = require("../middleware/auth");
const { BadRequestError } = require("../expressError");
const friendNewSchema = require("../schemas/friendNew.json");

const router = express.Router({mergeParams: true});
// router.use(logParams);

// Routes
/**  POST /users/:username/friends/request/:receiver 
 * 
 * Does not require a payload.
 * 
 * Creates a new request from a logged in user to another.
 * 
 * Returns: the newly created friendRequest object: { friendRequest: { sender, receiver, requestStatus }}
 * 
 * Authorization: admin or correct user
*/

router.post("/request/:receiver", ensureCorrectUserOrAdmin, async function (req, res, next) {
    try{
        // validate that request follows friendNewSchema
        const validator = jsonschema.validate(req.body, friendNewSchema);
        if( !validator.valid ) {
            const errs = validator.errors.map(e => e.stack);
            throw new BadRequestError(errs);
        }

        // make new request with Friend.request
        // console.log("Friend Request Body: ", req.body);
        // console.log("Friend Request Params: ", req.params);
        const friendRequest = await Friend.request(req.params.username, req.params.receiver);
        // console.log("Successfully made Friend Request: ", friendRequest);

        // return json of friendRequest with a status code of 201
        return res.status(201).json({ friendRequest });
    }
    catch (err) {
        return next(err);
    }
});

/** GET users/:username/friends/request/:receiver
 * Does not require payload
 * 
 * Retrieves a specific request from friends
 * 
 * Returns: { friendRequest: { sender, receiver, requestStatus }}
 * 
 * Authorization: admin or correct user
 */
router.get("/request/:receiver", ensureCorrectUserOrAdmin, async (req, res, next) => {
    try {
        const friendRequest = await Friend.get(req.params.username, req.params.receiver);
        return res.json({ friendRequest });
    }
    catch (err) {
        return next(err);
    }
});

/** GET users/:username/friends/sent
 * Does not require payload
 * 
 * Retrieves a all pending request sent by the user
 * 
 * Returns: { friendRequests: [{ sender, receiver, requestStatus }}]
 * 
 * Authorization: admin or correct user
 */
router.get("/sent", ensureCorrectUserOrAdmin,async (req, res, next) => {
    try {
        const username = req.params.username;
        // console.log("username: ", username);
        const friendRequests = await Friend.findAllRequestBySender(username);
        // console.log("friendRequests: ",friendRequests);
        return res.json({ friendRequests });
    }
    catch (err) {
        return next(err);
    }
});

/** GET users/:username/friends/received
 * Does not require payload
 * 
 * Retrieves a all pending request received by the user
 * 
 * Returns: { friendRequests: [{ sender, receiver, requestStatus }}]
 * 
 * Authorization: admin or correct user
 */
router.get("/received", ensureCorrectUserOrAdmin,async (req, res, next) => {
    try {
        const username = req.params.username;
        // console.log("username: ", username);
        const friendRequests = await Friend.findAllRequestByReceiver(username);
        // console.log("friendRequests: ",friendRequests);
        return res.json({ friendRequests });
    }
    catch (err) {
        return next(err);
    }
});

/** GET users/:username/friends
 * Does not require payload
 * 
 * Retrieves a all current friends of a user
 * 
 * Returns: { friends: [{ sender, receiver, requestStatus }}]
 * 
 * Authorization: admin or correct user
 */
router.get("/", ensureLoggedIn, async (req, res, next) => {
    try {
        const username = req.params.username;
        // console.log("username: ", username);
        const friends = await Friend.findAllFriends(username);
        // console.log("friendRequests: ",friendRequests);
        return res.json({ friends });
    }
    catch (err) {
        return next(err);
    }
});

/** PATCH /users/:username/friends/request/:sender
 * Changes the request_status of a friend request from false to true
 * 
 * Data not included
 * 
 * Returns: { friendRequest: { sender, receiver, requestStatus }}
 * 
 * Authorization: Admin or correct user
 */
router.patch("/request/:sender", ensureCorrectUserOrAdmin, async (req, res, next) => {
    try{
        const friendRequest = await Friend.acceptRequest(req.params.sender, req.params.username);

        return res.json({ friendRequest });
    }
    catch (err) {
        return next(err);
    }
});

/** DELETE /users/:username/friends/request/:sender
 * Removes a friend request.
 * 
 * Data not included
 * 
 * Returns: { friendRequest: { sender, receiver, requestStatus }}
 * 
 * Authorization: Admin or correct user
 */
router.delete("/request/:sender", ensureCorrectUserOrAdmin, async (req, res, next) => {
    try{
        const friendRequest = await Friend.remove(req.params.sender, req.params.username);
        
        return res.json({ friendRequest });
    }
    catch (err) {
        return next(err);
    }
});
// Exports
module.exports = router;