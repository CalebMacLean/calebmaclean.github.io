// Imports
const request = require("supertest");
const app = require("./app");
const db = require("./db");


describe("not found error handling", function() {
    test("not found for site 404", async function() {
        // set NODE_ENV var to production
        process.env.NODE_ENV = "production";
        // make request to undefined route to ensure 404 status code
        const resp = await request(app).get("/no-such-path");

        // debugging logs
        console.log("Response from /no-such-path: ", resp.statusCode);
        // console.log("Response from /no-such-path: ", resp.message);
        console.log("Passes Test: ", resp.statusCode === 404);

        expect(resp.statusCode).toEqual(404);
        // clean up NODE_ENV
        delete process.env.NODE_ENV;
    });
    
    test("not found for site 404 (test stack print)", async function() {
        // set NODE_ENV var to test
        process.env.NODE_ENV = "test";
        // make request to undefined route to ensure 404 status code
        const resp = await request(app).get("/no-such-path");
    
        // console.log("Response from /no-such-path: ", resp.message);
    
        expect(resp.statusCode).toEqual(404);
        // clean up NODE_ENV
        delete process.env.NODE_ENV;
    });
})

afterAll(function() {
    db.end();
});