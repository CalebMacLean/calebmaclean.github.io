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
        const user = await User.authenticate("u1", "password1");
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

/**************************************** register */
describe("register class method", function () {
    test("works", async function () {
        // Await User.register with necessary data
        const user = await User.register({
            username: "exampleUser",
            password: "password",
            firstName: "example",
            lastName: "User",
            email: "example@email.com",
            isAdmin: false
        });

        // Should return { username, firstName, lastName, email, avatar, isAdmin }
        expect(user).toEqual({
            username: "exampleUser",
            firstName: "example",
            lastName: "User",
            email: "example@email.com",
            avatar: "assets/default_pfp.jpg",
            numPomodoros: 0,
            isAdmin: false
        });
    });

    test("Throws Error if passed an existant username", async function () {
        try{
            // Await User.register with invalid data
            const user = await User.register({
                username: "u1",
                password: "password",
                firstName: "example",
                lastName: "User",
                email: "example@email.com",
                isAdmin: false
            });
            fail();
        }
        catch (err) {
            // Error should be a BadRequestError
            expect(err instanceof BadRequestError).toBeTruthy();
            // Error should have a specific message
            expect(err.message).toEqual(`Duplicate username: u1`);
        }
    });
});

/**************************************** findAll */
describe("findAll class method", function () {
    test("works", async function () {
        // Await User.findAll, no parameters necessary
        const result = await User.findAll();
        // The beforeAll sets inserts two users into the database, so we expect two users
        expect(result).toEqual([
            {
                username: 'u1',
                firstName: 'U1F',
                lastName: 'U1L',
                email: 'u1@email.com',
                avatar: 'assets/default_pfp.jpg',
                numPomodoros: 0,
                isAdmin: false
            },
            {
                username: 'u2',
                firstName: 'U2F',
                lastName: 'U2L',
                email: 'u2@email.com',
                avatar: 'assets/default_pfp.jpg',
                numPomodoros: 0,
                isAdmin: false
            }
        ]);
    });
});

/**************************************** get */
describe("get class method", function () {
    test("works", async function () {
        // Search database for u1
        const user = await User.get("u1");
        // beforeAll should have inserted a u1 user
        expect(user).toEqual({
            username: 'u1',
            firstName: 'U1F',
            lastName: 'U1L',
            email: 'u1@email.com',
            avatar: 'assets/default_pfp.jpg',
            numPomodoros: 0,
            isAdmin: false
        });
    });

    test("Throws NotFoundError if no user", async function () {
        try {
            // Search database for non-existant user
            const user = await User.get("fakeUser");
            fail();
        }
        catch (err) {
            // err should be NotFoundError
            expect(err instanceof NotFoundError).toBeTruthy();
            // err should have a specific message
            expect(err.message).toEqual("No user: fakeUser");
        }
    });
});

/**************************************** update */
describe("update class method", function () {
    // create update data for tests
    const updateData = {
        firstName: "NewF",
        lastName: "NewF",
        email: "new@email.com",
        avatar: "assets/new_pfp.jpg",
        isAdmin: true
    };

    test("works", async function () {
        // update u1 with updateData object
        let updateUser = await User.update("u1", updateData);
        // data except for username should be changed
        expect(updateUser).toEqual({
            username: "u1",
            ...updateData
        });
    });

    test("bad request if no data", async function () {
        expect.assertions(1);
        try{

        }
        catch (err) {
            // err should be BadRequestError
            expect(err instanceof BadRequestError).toBeTruthy();
            // err should have a specific message
            expect(err.message).toEqual("No data");
        }
    })
})