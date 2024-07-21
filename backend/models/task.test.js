// Enable strict mode to avoid common mistakes
"use strict";

// Imports
const {
    NotFoundError,
    BadRequestError
} = require("../expressError");
const db = require("../db");
const Task = require("./task");
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
        // use Task.add to create a new task for list 1
        const result = await Task.add({
            title: 'example todo',
            listId: 1,
            expectedPomodoros: 3
        });

        console.log(result);

        expect(result).toEqual({
            id: expect.any(Number),
            title: 'example todo',
            listId: 1,
            expectedPomodoros: 3,
            completedCycles: 0,
            completedStatus: false
        });
    });

    test("throws BadRequestError with no data", async function () {
        try{
            await Task.add();
            fail();
        }   
        catch (err) {
            expect(err instanceof BadRequestError).toBeTruthy();
            expect(err.message).toEqual('No data');
        }     
    });

    test("throws BadRequestError without listId", async function () {
        try{
            await Task.add({title: 'badrequest task'});
            fail();
        }   
        catch (err) {
            expect(err instanceof BadRequestError).toBeTruthy();
            expect(err.message).toEqual('No listId');
        }     
    });
})