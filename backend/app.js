// Enable strict mode to avoid common mistakes
"use strict";

/** Main Application for backend functionality */
// Imports
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const { NotFoundError } = require("./expressError");

// Application declaration and configurations
const app = express();

// Enables app to handle requests from different origins
app.use(cors());
// Applies middleware that auto-parses JSON formatted req bodies.
app.use(express.json());
// tiny is a predefined format that includes minimal req info when logging
app.use(morgan("tiny"));

/** Handle 404 errors --- Matches everything */
app.use(function(req, res, next) {
    // console.log("Hit 404 Route Handler");
    return next( new NotFoundError() );
});

/** Generic Error Handler - Anything not handled lands here */
app.use(function(err, req, res, next) {
    console.log("Hit General Error Handling Route")
    // testing env should log errs to the console
    if ( process.env.NODE_ENV === "test" ) {
        console.log(err.stack);
    }
    // Set err status and message
    const status = err.status || 500;
    const message = err.message;
    
    // return jsonified error with status and message
    return res.status(status).json({
        error: {message, status}
    });
});

// Exports
module.exports = app;