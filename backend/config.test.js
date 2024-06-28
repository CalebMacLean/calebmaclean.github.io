// Enable strict mode to catch common mistakes
"use strict";

describe("config can come from env", function() {
    test("works", function() {
        // Set env vars
        process.env.SECRET_KEY = "abc";
        process.env.PORT = "5000";
        process.env.DATABASE_URL = "other";
        process.env.NODE_ENV = "other";

        // Import config settings from config.js
        const config = require("./config");
        // test that settings are set to previously created env vars
        expect(config.SECRET_KEY).toEqual("abc");
        expect(config.PORT).toEqual("5000");
        expect(config.getDatabaseUri()).toEqual("other");
        expect(config.BCRYPT_WORK_FACTOR).toEqual(12);

        // clean up env vars
        delete process.env.SECRET_KEY;
        delete process.env.PORT;
        delete process.env.BCRYPT_WORK_FACTOR;
        delete process.env.DATABASE_URL;

        // check that getDatabaseUri in non test env returns "pomodoro"
        expect(config.getDatabaseUri()).toEqual("pomodoro");

        // check that getDatabaseUri in test env returns "pomodoro_test"
        process.env.NODE_ENV = "test";
        expect(config.getDatabaseUri()).toEqual("pomodoro_test");
    })
})