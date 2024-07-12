// Enable strict mode to avoid common mistakes
"use strict";

// Imports
const {
    NotFoundError,
    BadRequestError,
    UnauthorizedError
} = require("../expressError");
const db = require("../db");
const Friend = require("./friend");
const {
    commonBeforeAll,
    commonBeforeEach,
    commonAfterEach,
    commonAfterAll
} = require("./_testCommon");

// Set Up & Tear Down
// check models/_testCommon.js for reference
beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

/**************************************** request */
describe("request class method", function () {
    test("works", async function () {
        // use Friend.request to add a new row to the db table
        const result = await Friend.request('u1', 'u2');
        expect(result).toEqual({
            sender: 'u1',
            receiver: 'u2',
            requestStatus: false
        });
    })
})