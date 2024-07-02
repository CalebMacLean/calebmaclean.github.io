// Enable strict mode to avoid common mistakes
"use strict";

// Imports
const {
    NotFoundError,
    BadRequestError,
    UnauthorizedError
} = require("../expressError");
const db = require("../db");
const User = require("./user.js");
const {
    commonBeforeAll,
    commonBeforeEach,
    commonAfterEach,
    commonAfterAll
} = require("./_testCommon.js");

// Set Up & Tear Down
// check models/_testCommon.js for clarification
beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

/**************************************** authenticate */
describe("authenticate class method", function() {
    test("works", async function () {
        // use User.authenticate, passing test data that should be included in beforeAll step
        const user = User.authenticate("u1", "password1");
        // check that an obj with {username, firstName, lastName, email, avatar, numPomodoros, isAdmin} is returned
        expect(user).toEqual({
            username: "u1",
            firstName: "U1F",
            lastName: "U1L",
            email: "u1@email.com",
            avatar: 'assets/default_pfp.jpg',
            numPomodoros: 0,
            isAdmin: false
        });
    });

    test("unauthorized error if no such user", async function () {
        // Use Try/Catch to expect the error properly
        try{
            // use User.authenticate with bad data
            await User.authenticate("nope", "password");
            fail();
        }
        catch (err) {
            // check that the error is an expected instance of the Unauthorized Error
            expect(err instanceof UnauthorizedError).toBeTruthy();
        }
    });
});