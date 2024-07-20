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

/**************************************** findAllRequestBySender */
describe("findAllRequestBySender class method", function () {
    test("works", async function () {
        // make request with u1
        const result = await Friend.findAllRequestBySender('u1');

        expect(result).toEqual([{
            requestStatus: false,
            username: 'u2',
            avatar: 'assets/default_pfp.jpg',
            firstName: 'U2F',
            lastName: 'U2L'
        }]);
    });

    test("works with true status", async function () {
        const result = await Friend.findAllRequestBySender('u2', true);

        expect(result).toEqual([{
            requestStatus: true,
            username: 'u4',
            avatar: 'assets/default_pfp.jpg',
            firstName: 'U4F',
            lastName: 'U4L'
        }]);
    });
});

/**************************************** findAllRequestByReceiver */
describe("findAllRequestByReceiver class method", function () {
    test("works", async function () {
        // make request with u2
        const result = await Friend.findAllRequestByReceiver('u1');

        expect(result).toEqual([{
            requestStatus: false,
            username: 'u3',
            avatar: 'assets/default_pfp.jpg',
            firstName: 'U3F',
            lastName: 'U3L'
        }]);
    });

    test("works with true status", async function () {
        const result = await Friend.findAllRequestByReceiver('u2', true);

        expect(result).toEqual([{
            requestStatus: true,
            username: 'u5',
            avatar: 'assets/default_pfp.jpg',
            firstName: 'U5F',
            lastName: 'U5L'
        }]);
    });
});

/**************************************** findAllFriends */
describe("findAllFriendsclass method", function () {
    test("works", async function () {
        // make request with u2
        const result = await Friend.findAllFriends('u2');

        expect(result).toEqual([
            {
            requestStatus: true,
            username: 'u4',
            avatar: 'assets/default_pfp.jpg',
            firstName: 'U4F',
            lastName: 'U4L'
            },
            {
                requestStatus: true,
                username: 'u5',
                avatar: 'assets/default_pfp.jpg',
                firstName: 'U5F',
                lastName: 'U5L'
            }
        ]);
    });
});

/**************************************** acceptRequest */
describe("acceptRequest class method", function () {
    test("works", async function () {
        // make request with u2
        const result = await Friend.acceptRequest('u1', 'u2');

        expect(result).toEqual({
            requestStatus: true,
            username: 'u1',
            firstName: 'U1F',
            lastName: 'U1L'
        });
    });
});

/**************************************** remove */
describe("remove class method", function () {
    test("works", async function () {
        // make request with u1 and u2
        const result = await Friend.remove('u1', 'u2');

        expect(result).toEqual(undefined);
    });

    test("throws NotFoundError without valid username pairing", async function () {
        try{
            // make request with invalid usernames
            await Friend.remove('fakeUser', 'testUser');
            fail();
        }
        catch (err) {
            expect(err instanceof NotFoundError).toBeTruthy();
            expect(err.message).toEqual('fakeUser to testUser request not found');
        }
    })
});