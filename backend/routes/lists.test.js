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
});