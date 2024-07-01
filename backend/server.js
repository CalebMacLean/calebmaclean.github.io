// Enable strict mode to avoid common errors
"use strict";

/** Server start up logic */
// Imports
const app = require("./app");
const { PORT } = require("./config");

app.listen(PORT, function() {
    console.log(`Started on http://localhost:${PORT}`);
})