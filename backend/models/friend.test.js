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
        const result = await Friend.request('u1', 'u3');
        expect(result).toEqual({
            sender: 'u1',
            receiver: 'u3',
            requestStatus: false
        });
    });
});

/**************************************** get */
describe("get class method", function () {
    test("works", async function () {
        // try to get the friend status of u1 and u2
        const result = await Friend.get('u1', 'u2');
        expect(result).toEqual({
            sender: 'u1',
            receiver: 'u2',
            requestStatus: false
        });
    });

    test("throws NotFoundError with invalid parameters", async function () {
        // try to get with bad params
        try{
            const result = await Friend.get('u2', 'u3');
            fail();
        }
        catch (err) {
            expect(err instanceof NotFoundError).toBeTruthy();
            expect(err.message).toEqual(`No friendship found`);
        }
    })
})
