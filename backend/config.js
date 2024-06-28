// Enable strict mode to catch common mistakes
"use strict";

/** Shared Configuration for backend of application, can be required in many places */
// Imports
require("dotenv").config();
const SECRET_KEY = process.env.SECRET_KEY || "shadow-dev";
const PORT = process.env.PORT || 3001;

/** Database Uri Function
 * 
 * Checks env var to determine whether the database or test database uri should be returned.
 * 
 * Parameters: -none
 */
function getDatabaseUri() {
    return ( process.env.NODE_ENV === "test" )
        ? "pomodoro_test"
        : process.env.DATABASE_URL || "pomodoro";
};

// Speed up bcrypt during tests
const BCRYPT_WORK_FACTOR = process.env.NODE_ENV === "test" ? 1 : 12;

// Log config settings to the console
console.log("-------------------------------------------");
console.log("Pomodoro Config:");
console.log("SECRET_KEY: ", SECRET_KEY);
console.log("PORT: ", PORT);
console.log("BCRYPT_WORK_FACTOR: ", BCRYPT_WORK_FACTOR);
console.log("Database: ", getDatabaseUri());
console.log("-------------------------------------------");

// Exports
module.exports = {
    SECRET_KEY,
    PORT,
    BCRYPT_WORK_FACTOR,
    getDatabaseUri
}