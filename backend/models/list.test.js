// Enable strict mode to avoid common mistakes
"use strict";

// Imports
const {
    NotFoundError,
    BadRequestError
} = require("../expressError");
const db = require("../db");
const List = require("./list");
const {
    commonBeforeAll,
    commonBeforeEach,
    commonAfterEach,
    commonAfterAll
} = require("./_testCommon");

// Set Up & Tear Down
// check models/_testCommon.js for clarification
beforeAll(async () => await commonBeforeAll());
beforeEach(async () => await commonBeforeEach());
afterEach(async () => await commonAfterEach());
afterAll(async () => await commonAfterAll());

/**************************************** add */
describe("add class method", function () {
    test("works", async function () {
        // use List.add to create a new list for u1
        const result = await List.add({
            username: 'u1',
            title: 'new list',
            listType: false,
            expiredAt: '01/05/2025'
        });

        expect(result).toEqual({
            id: expect.any(Number),
            title: 'new list',
            username: 'u1',
            listType: false,
            createdAt: expect.any(Date),
            expiredAt: expect.any(Date)
        });
    });

    test("Throws BadRequestError with no username", async function () {
        try {
            // use List.add without a username
            const result = await List.add();
            fail();
        }
        catch (err) {
            // Should be a BadRequestError
            expect(err instanceof BadRequestError).toBeTruthy();
            // Should have a specific message
            expect(err.message).toEqual('No username');
        }
    })
});

/**************************************** update */
describe("update class method", function () {
    const dataToUpdate = {
        title: "new",
        listType: false
    };

    test("works", async function () {

        const result = await List.update(1, dataToUpdate);

        expect(result).toEqual({
            id: 1,
            title: 'new',
            listType: false,
            createdAt: expect.any(Date),
            expiredAt: null
        });
    });

    test("throws NotFoundError if list id is invalid", async function () {
        try {
            // make request with List.update to invalid id
            const result = await List.update(100, dataToUpdate);
            fail();
        }
        catch (err) {
            expect(err instanceof NotFoundError).toBeTruthy();
            expect(err.message).toEqual("List not found");
        }
    });

    test("throws BadRequestError if no data is passed", async function () {
        try{
            // make request with List.update with no id
            const result = await List.update(1, {});
            fail();
        }
        catch (err) {
            expect(err instanceof BadRequestError).toBeTruthy();
            expect(err.message).toEqual("No data")
        }
    });
});

/**************************************** get */
describe("get class method", function () {
    test("works", async function () {
        // make a request to the first list in db
        const list = await List.get(1);

        expect(list).toEqual({
            id: 1,
            title: 'To-Do List',
            listType: true,
            createdAt: expect.any(Date),
            expiredAt: null
        });
    });

    test("throws NotFoundError with invalid id", async function () {
        try{
            // make a request with an invalid id
            const result = await List.get(100);
            fail();
        }
        catch (err) {
            expect(err instanceof NotFoundError).toBeTruthy();
            expect(err.message).toEqual(`No list at: 100`);
        }
    });
});

/**************************************** findAll */
describe("findAll class method", function () {
    test("works", async function () {
        // make request
        const result = await List.findAll();

        expect(result).toEqual([
            {
                id: 1,
                title: 'To-Do List',
                listType: true,
                createdAt: expect.any(Date),
                expiredAt: null
            },
            {
                id: 2,
                title: 'expired list',
                listType: true,
                createdAt: expect.any(Date),
                expiredAt: expect.any(Date),
            }
        ]);
    });
});

/**************************************** remove */
describe("remove class method", function () {
    test("works", async function () {
        // make request
        const result = await List.remove(2);

        expect(result).toEqual(undefined);
    });
});

/**************************************** removeExpired */
describe("removeExpired class method", function () {
    test("works", async function () {
        // get the second list
        const list = await List.get(2);
        // call removeExpired
        const expiredRes = await List.removeExpired(list);
        expect(expiredRes).toEqual(undefined);
    });
});