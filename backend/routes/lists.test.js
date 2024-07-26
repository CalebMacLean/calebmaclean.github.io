"use strict";

// Imports
const request = require("supertest");

const db = require("../db");
const app = require("../app");
const List = require("../models/list");
const {
    commonBeforeAll,
    commonBeforeEach,
    commonAfterEach,
    commonAfterAll,
    u1Token,
    u2Token,
    adminToken,
    u5Token,
} = require("./_testCommon");

// Set Up & Tear Down
beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

/************************************** POST /lists */
describe("POST /lists", function () {
    test("works for admins: create list", async function () {
        const res = await request(app)
            .post("/lists")
            .set("authorization", `Bearer ${adminToken}`)
            .send({
                title: "New Test List",
                username: "u5",
                listType: true
            });
        
        expect(res.body).toEqual({
            list: {
                id: expect.any(Number),
                title: "New Test List",
                username: "u5",
                listType: true,
                createdAt: expect.any(String),
                expiresAt: null
            }
        });
    });

    test("works for users: create list", async function () {
        const res = await request(app)
            .post("/lists")
            .set("authorization", `Bearer ${u5Token}`)
            .send({
                title: "New Test List",
                username: "u5",
                listType: true
            });
        
        expect(res.body).toEqual({
            list: {
                id: expect.any(Number),
                title: "New Test List",
                username: "u5",
                listType: true,
                createdAt: expect.any(String),
                expiresAt: null
            }
        });
    });
});

/************************************** PATCH /lists/:id */
describe("PATCH /lists/:id", function () {
    test("works for admin: updates a list", async function () {
        const res = await request(app)
            .patch("/lists/1")
            .set("authorization", `Bearer ${adminToken}`)
            .send({
                title: "new",
                listType: false,
            });

        expect(res.body).toEqual({
            list: {
                id: 1,
                // username: "u1",
                title: "new",
                listType: false,
                createdAt: expect.any(String),
                expiresAt: null
            }
        });
    });

    test("works for users: updates a list", async function () {
        const res = await request(app)
            .patch("/lists/1")
            .set("authorization", `Bearer ${u1Token}`)
            .send({
                title: "new",
                listType: false,
                username: "u1"
            });

        expect(res.body).toEqual({
            list: {
                id: 1,
                // username: "u1",
                title: "new",
                listType: false,
                createdAt: expect.any(String),
                expiresAt: null
            }
        });
    });
});

/************************************** GET /lists/:id */
describe("GET /lists/:id", function () {
    test("works for users", async function () {
        const res = await request(app)
            .get("/lists/1")
            .set("authorization", `Bearer ${adminToken}`);

        expect(res.body).toEqual({
            list: {
                id: 1,
                listType: true,
                title: "Example List",
                createdAt: expect.any(String),
                expiresAt: null
            }
        });
    });
});

/************************************** GET /lists */
describe("GET /lists", function () {
    test("works for users: gets all lists", async function () {
        const res = await request(app)
            .get("/lists")
            .set("authorization", `Bearer ${u1Token}`);
        
        expect(res.body).toEqual({
            lists: [
                {
                    id: 1,
                    listType: true,
                    title: "Example List",
                    createdAt: expect.any(String),
                    expiresAt: null
                }
            ]
        });
    });
});

/************************************** DELETE /lists/:id */
describe("DELETE /lists/:id", function () {
    test("works for admin: removes a list", async function () {
        const res = await request(app)
            .delete("/lists/1")
            .set("authorization", `Bearer ${adminToken}`)

        expect(res.body).toEqual({
            "deleted": "1"
        });
    });
});