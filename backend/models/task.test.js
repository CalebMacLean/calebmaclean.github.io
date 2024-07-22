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
});

/**************************************** update */
describe("update class method", function () {
    test("works", async function () {
        // use Task.update on 1
        const result = await Task.update(1, {
            title: "new task",
            expectedPomodoros: 5,
            completedCycles: 2,
            completedStatus: true
        });

        expect(result).toEqual({
            id: 1,
            listId: 1,
            title: "new task",
            expectedPomodoros: 5,
            completedCycles: 2,
            completedStatus: true
        });
    });

    test("throws BadRequestError without id", async function () {
        try{
            await Task.update({title: "bad request", listId: 1});
            fail();
        }
        catch (err) {
            expect(err instanceof BadRequestError).toBeTruthy();
            expect(err.message).toEqual('No id provided');
        }
    });

    test("throws BadRequestError without data", async function () {
        try{
            await Task.update(1);
            fail();
        }
        catch (err) {
            expect(err instanceof BadRequestError).toBeTruthy();
            expect(err.message).toEqual('No data');
        }
    });

    test("throws NotFoundError with invalid id", async function () {
        try{
            await Task.update(100, {title: 'bad request', listId: 1});
            fail();
        }
        catch (err) {
            expect(err instanceof NotFoundError).toBeTruthy();
            expect(err.message).toEqual('Task not found');
        }
    });
});

/**************************************** get */
describe("get class method", function () {
    test("works", async function () {
        // use Task.get on 1
        const task = await Task.get(1);

        expect(task).toEqual({
            id: 1,
            title: "task1",
            listId: 1,
            expectedPomodoros: 1,
            completedCycles: 0,
            completedStatus: false
        });
    });

    test("throws NotFoundError with invalid id", async function () {
        try{
            await Task.get(10000);
            fail();
        }
        catch (err) {
            expect(err instanceof NotFoundError).toBeTruthy();
            expect(err.message).toEqual('No id: 10000');
        }
    });
});

/**************************************** getTasksByList */
describe("getTasksByList class method", function () {
    test("works", async function () {
        // use Task.getTaskByList on 1
        const task = await Task.getTasksByList(1);

        expect(task).toEqual([
            {
                id: expect.any(Number),
                title: 'task1',
                listId: 1,
                expectedPomodoros: 1,
                completedCycles: 0,
                completedStatus: false
            },
            {
                id: expect.any(Number),
                title: 'task2',
                listId: 1,
                expectedPomodoros: 2,
                completedCycles: 0,
                completedStatus: false
            },
            {
                id: expect.any(Number),
                title: 'task3',
                listId: 1,
                expectedPomodoros: 3,
                completedCycles: 0,
                completedStatus: false
            }
        ]);
    });

    test("throws NotFoundError with invalid id", async function () {
        try{
            await Task.getTasksByList(10000);
            fail();
        }
        catch (err) {
            expect(err instanceof NotFoundError).toBeTruthy();
            expect(err.message).toEqual('No list: 10000');
        }
    });
});

/**************************************** remove */
describe("remove class method", function () {
    test("works", async function () {
        // use Task.remove on 3
        const task = await Task.remove(3);
        expect(task).toEqual(undefined);
    });

    test("throws NotFoundError with invalid id", async function () {
        try{
            await Task.remove(10000);
            fail();
        }
        catch (err) {
            expect(err instanceof NotFoundError).toBeTruthy();
            expect(err.message).toEqual('No id: 10000');
        }
    });
});

/**************************************** removeGroup*/
describe("removeGroup class method", function () {
    test("works", async function () {
        // use Task.remove on 3
        const task = await Task.removeGroup([1,3]);
        expect(task).toEqual(undefined);
    });

    test("throws NotFoundError with invalid id", async function () {
        try{
            await Task.removeGroup([10000, 500]);
            fail();
        }
        catch (err) {
            expect(err instanceof NotFoundError).toBeTruthy();
            expect(err.message).toEqual('No tasks found for provided ids');
        }
    });

    test("throws BadRequestError with invalid parameter", async function () {
        try{
            await Task.removeGroup(1);
            fail();
        }
        catch (err) {
            expect(err instanceof BadRequestError).toBeTruthy();
            expect(err.message).toEqual('No ids provided');
        }
    });
});