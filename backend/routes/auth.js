/** Routes for authentication */
// Imports
const express = require("express");
const router = new express.Router();
const { BadRequestError } = require("../expressError");

/** POST /auth/token: { username, password } => { token } 
 * 
 * Returns JWT token which will be used to authorize other request.
 * 
 * Authorization required: none
*/
router.post("/token", async function(req, res, next) {
    try {
        // extracted req vars
        const { username, password } = req.body;

        console.log("username: ", username);
        console.log("password: ", password);

        return res.json({username, password});
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
        // make up username and password variables
        const username = "testcaleb";
        const password = "calebpassword";

        return res.json({username, password});
    }
    catch (err) {
        return next(err);
    }
})

// Exports
module.exports = router;