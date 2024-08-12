// Enable strict mode to avoid common errors
"use strict";

/** Server start up logic */
// Imports
const express = require('express');
const app = require("./app");
const { PORT } = require("./config");
const path = require('path');

app.use(express.static(path.join( __dirname, '..', 'frontend', 'dist')));

app.get('*', (req, res) => {
    res.sendFile(path.join( __dirname, '..', 'frontend', 'dist', 'index.html'));
});

app.listen(PORT, function() {
    console.log(`Started on http://localhost:${PORT}`);
})