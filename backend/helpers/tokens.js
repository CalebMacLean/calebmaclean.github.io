// Imports
const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../config");

/** createToken helper function 
 * Generates a JWT for a given user.
 * 
 * Parameter:
 * - user: (obj) user object
 * 
 * Returns: a encrypted string
*/
function createToken(user) {
    // Assertion Check: user.isAdmin is provided
    console.assert( 
        user.isAdmin !== undefined,
        "createToken passed user without isAdmin property"
    );

    // create payload for jwt signature
    let payload = {
        username: user.username,
        isAdmin: user.isAdmin || false
    };
    // create/return signature using the payload and application's SECRET_KEY
    const signature = jwt.sign(payload, SECRET_KEY);
    return signature;
}

// Exports
module.exports = { createToken };