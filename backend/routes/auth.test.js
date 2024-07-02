// Enable strict mode to avoid common errors
"use strict";

/** Testing authentication routes */
// Imports
const request = require("supertest");
const app = require("../app");

/******************************************* POST /auth/token */
describe("POST /auth/token", function () {
    test("works", async function() {
        const resp = await request(app)
            .post("/auth/token")
            .send({
                username: "u1",
                password: "password1"
            });
        
        expect(resp.body).toEqual({
            "username": "u1",
            "password": "password1"
        });
    });
});

/******************************************* POST /auth/register */
describe("POST /auth/register", function () {
    test("works", async function () {
        const resp = await request(app)
            .post("/auth/register")
            .send({});
        
        expect(resp.body).toEqual({
            "username": "testcaleb",
            "password": "calebpassword"
        });
    });
});