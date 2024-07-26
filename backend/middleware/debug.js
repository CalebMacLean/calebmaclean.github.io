"use strict";

/** Middleware: Log the req.params obj to the console */
function logParams(req, res, next) {
    console.log("logParams Params: ", req.params);
    next();
}

// Exports
module.exports = { logParams };