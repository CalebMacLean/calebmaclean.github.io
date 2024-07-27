"use strict";

// Imports
const request = require("supertest");

const db = require("../db.js");
const app = require("../app");

const {
    commonBeforeAll,
    commonBeforeEach,
    commonAfterEach,
    commonAfterAll,
    u1Token,
    u2Token,
    adminToken,
} = require("./_testCommon");

// Set Up & Tear Down
beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

/************************************ POST /tasks */
describe("POST /tasks", function () {
    test("works for admin: add task to list", async () => {
        const res = await request(app)
            .post("/lists/1/tasks")
            .set("authorization", `Bearer ${adminToken}`)
            .send({
                title: "task2",
                listId: 1,
            });

        expect(res.body).toEqual({
            task: {
                id: expect.any(Number),
                title: "task2",
                listId: 1,
                expectedPomodoros: 1,
                completedCycles: 0,
                completedStatus: false
            }
        });
    });

    test("works for users: add task to list", async () => {
        const res = await request(app)
            .post("/lists/1/tasks")
            .set("authorization", `Bearer ${u1Token}`)
            .send({
                title: "task2",
                listId: 1,
            });

        expect(res.body).toEqual({
            task: {
                id: expect.any(Number),
                title: "task2",
                listId: 1,
                expectedPomodoros: 1,
                completedCycles: 0,
                completedStatus: false
            }
        });
    });
});

/************************************ GET /tasks */
describe("GET /tasks", function () {
    test("works for users", async () => {
        const res = await request(app)
            .get("/lists/1/tasks")
            .set("authorization", `Bearer ${u2Token}`);

        expect(res.body).toEqual({
            tasks: [
                {
                    id: expect.any(Number),
                    title: "task1",
                    listId: 1,
                    expectedPomodoros: 1,
                    completedCycles: 0,
                    completedStatus: false
                },
                {
                    id: expect.any(Number),
                    title: "task2",
                    listId: 1,
                    expectedPomodoros: 1,
                    completedCycles: 0,
                    completedStatus: false
                },
                {
                    id: expect.any(Number),
                    title: "task3",
                    listId: 1,
                    expectedPomodoros: 1,
                    completedCycles: 0,
                    completedStatus: false
                },
                {
                    id: expect.any(Number),
                    title: "task4",
                    listId: 1,
                    expectedPomodoros: 1,
                    completedCycles: 0,
                    completedStatus: false
                }
            ]
        });
    });
});

/************************************ GET /tasks/:id */
describe("GET /tasks/:id", function () {
    test("works for users", async () => {
        const res = await request(app)
            .get("/lists/1/tasks/1")
            .set("authorization", `Bearer ${u2Token}`);

        expect(res.body).toEqual({
            task: {
                id: expect.any(Number),
                title: "task1",
                listId: 1,
                expectedPomodoros: 1,
                completedCycles: 0,
                completedStatus: false
            }
        });
    });
});

/************************************ PATCH /tasks/:id */
describe("PATCH /tasks/:id", function () {
    test("works for users", async () => {
        const res = await request(app)
            .patch("/lists/1/tasks/1")
            .set("authorization", `Bearer ${u2Token}`)
            .send({
                title: "new",
            });

        expect(res.body).toEqual({
            task: {
                id: expect.any(Number),
                title: "new",
                listId: 1,
                expectedPomodoros: 1,
                completedCycles: 0,
                completedStatus: false
            }
        });
    });
});

/************************************ DELETE /tasks/remove */
describe("DELETE /tasks/remove", function () {
    test("works for users", async () => {
        const res = await request(app)
            .delete("/lists/1/tasks/remove")
            .set("authorization", `Bearer ${u1Token}`)
            .send({
                ids: [2, 3, 4]
            });
        
        expect(res.body).toEqual({
            deleted: [2, 3, 4]
        });
    });
})
