"use strict";

// Imports
const request = require("supertest");
const app = require("../app");
const db = require("../db"); //May not be necessary
const Friend = require("../models/friend"); //May not be necessary
const {
    commonBeforeAll,
    commonBeforeEach,
    commonAfterEach,
    commonAfterAll,
    u1Token,
    u2Token,
    u3Token,
    u5Token,
    adminToken,
} = require("./_testCommon");

// Set Up & Tear Down
beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

/************************************** POST /users/:username/friends/request/:receiver */
describe("POST /users/:username/friends/request/:receiver", function () {
    test("works for admins: make a friend request", async function () {
        const res = await request(app)
            .post("/users/u1/friends/request/u2")
            .send({})
            .set("authorization", `Bearer ${adminToken}`);
        expect(res.statusCode).toEqual(201);
        expect(res.body).toEqual({
            friendRequest: {
                sender: "u1",
                receiver: "u2",
                requestStatus: false
            }
        });
    });

    test("works for users: make a friend request", async function () {
        const res = await request(app)
            .post("/users/u1/friends/request/u2")
            .send({})
            .set("authorization", `Bearer ${u1Token}`);
        expect(res.statusCode).toEqual(201);
        expect(res.body).toEqual({
            friendRequest: {
                sender: "u1",
                receiver: "u2",
                requestStatus: false
            }
        });
    });

    test("unauth for wrong user", async function () {
        const res = await request(app)
            .post("/users/u1/friends/request/u2")
            .send({})
            .set("authorization", `Bearer ${u2Token}`);
        
        expect(res.statusCode).toEqual(401);
    });

    test("unauth for anon", async function () {
        const res = await request(app)
            .post("/users/u1/friends/request/u2")
            .send({})
        
        expect(res.statusCode).toEqual(401);
    });
});

/************************************** GET /users/:username/friends/request/:receiver */
describe("GET /users/:username/friends/request/:receiver", function () {
    test("works for admins: get a friend request", async function () {
        const res = await request(app)
            .get("/users/u1/friends/request/u3")
            .set("authorization", `Bearer ${adminToken}`);
        expect(res.body).toEqual({
            friendRequest: {
                sender: "u1",
                receiver: "u3",
                requestStatus: false
            }
        });
    });

    test("works for users: get a friend request", async function () {
        const res = await request(app)
            .get("/users/u1/friends/request/u3")
            .set("authorization", `Bearer ${u1Token}`);
        expect(res.body).toEqual({
            friendRequest: {
                sender: "u1",
                receiver: "u3",
                requestStatus: false
            }
        });
    });

    test("unauth for wrong user", async function () {
        const res = await request(app)
            .get("/users/u1/friends/request/u3")
            .set("authorization", `Bearer ${u2Token}`);
        
        expect(res.statusCode).toEqual(401);
    });

    test("unauth for anon", async function () {
        const res = await request(app)
            .post("/users/u1/friends/request/u3")
        
        expect(res.statusCode).toEqual(401);
    });
});

/************************************** GET /users/:username/friends/sent */
describe("GET /users/:username/friends/request/sent", function () {
    test("works for admins: get sent friend requests", async function () {
        const res = await request(app)
            .get("/users/u3/friends/sent")
            .set("authorization", `Bearer ${adminToken}`);
        
        expect(res.body).toEqual({
            friendRequests: [
                {
                    username: "u2",
                    avatar: "assets/default_pfp.jpg",
                    firstName: "U2F",
                    lastName: "U2L",
                    requestStatus: false
                },
                {
                    username: "u4",
                    avatar: "assets/default_pfp.jpg",
                    firstName: "U4F",
                    lastName: "U4L",
                    requestStatus: false 
                }
            ]
        });
    });

    test("works for users: get sent friend requests", async function () {
        const res = await request(app)
            .get("/users/u3/friends/sent")
            .set("authorization", `Bearer ${u3Token}`);
        expect(res.body).toEqual({
            friendRequests: [
                {
                    username: "u2",
                    avatar: "assets/default_pfp.jpg",
                    firstName: "U2F",
                    lastName: "U2L",
                    requestStatus: false
                },
                {
                    username: "u4",
                    avatar: "assets/default_pfp.jpg",
                    firstName: "U4F",
                    lastName: "U4L",
                    requestStatus: false 
                }
            ]
        });
    });


    test("unauth for wrong user", async function () {
        const res = await request(app)
            .get("/users/u1/friends/sent")
            .set("authorization", `Bearer ${u2Token}`);
        
        expect(res.statusCode).toEqual(401);
    });

    test("unauth for anon", async function () {
        const res = await request(app)
            .get("/users/u1/friends/sent")
        
        expect(res.statusCode).toEqual(401);
    });
});

/************************************** GET /users/:username/friends/received */
describe("GET /users/:username/friends/received", function () {
    test("works for admin: retrieves received friend requests", async function () {
        const res = await request(app)
            .get("/users/u2/friends/received")
            .set("authorization", `Bearer ${adminToken}`)
            
        expect(res.body).toEqual({
            friendRequests: [
                {
                    username: "u3",
                    avatar: "assets/default_pfp.jpg",
                    firstName: "U3F",
                    lastName: "U3L",
                    requestStatus: false
                },
                {
                    username: "u5",
                    avatar: "assets/default_pfp.jpg",
                    firstName: "U5F",
                    lastName: "U5L",
                    requestStatus: false
                }
            ]
        });
    });

    test("works for correct user: retrieves received friend requests", async function () {
        const res = await request(app)
            .get("/users/u2/friends/received")
            .set("authorization", `Bearer ${u2Token}`)
            
        expect(res.body).toEqual({
            friendRequests: [
                {
                    username: "u3",
                    avatar: "assets/default_pfp.jpg",
                    firstName: "U3F",
                    lastName: "U3L",
                    requestStatus: false
                },
                {
                    username: "u5",
                    avatar: "assets/default_pfp.jpg",
                    firstName: "U5F",
                    lastName: "U5L",
                    requestStatus: false
                }
            ]
        });
    });

    test("unauth for wrong user", async function () {
        const res = await request(app)
            .get("/users/u2/friends/received")
            .set("authorization", `Bearer ${u1Token}`);
        
        expect(res.statusCode).toEqual(401);
    });

    test("unauth for anon", async function () {
        const res = await request(app)
            .get("/users/u2/friends/sent")
        
        expect(res.statusCode).toEqual(401);
    });
});

/************************************** GET /users/:username/friends */
describe("GET /users/:username/friends", function () {
    test("works for admin: gets active friends", async function () {
        const res = await request(app)
            .get("/users/u5/friends")
            .set("authorization", `Bearer ${adminToken}`);
        
        expect(res.body).toEqual({
            friends: [
                {
                   username: "u3",
                   avatar: "assets/default_pfp.jpg",
                   firstName: "U3F",
                   lastName: "U3L",
                   requestStatus: true 
                }
            ]
        });
    });

    test("works for correct user: gets active friends", async function () {
        const res = await request(app)
            .get("/users/u5/friends")
            .set("authorization", `Bearer ${u5Token}`);
        
        expect(res.body).toEqual({
            friends: [
                {
                   username: "u3",
                   avatar: "assets/default_pfp.jpg",
                   firstName: "U3F",
                   lastName: "U3L",
                   requestStatus: true 
                }
            ]
        });
    });

    test("works for any user: gets active friends", async function () {
        const res = await request(app)
            .get("/users/u5/friends")
            .set("authorization", `Bearer ${u1Token}`);
        
        expect(res.body).toEqual({
            friends: [
                {
                   username: "u3",
                   avatar: "assets/default_pfp.jpg",
                   firstName: "U3F",
                   lastName: "U3L",
                   requestStatus: true 
                }
            ]
        });
    });
});

/************************************** PATCH /users/:username/friends/request/:sender */
describe("PATCH /users/:username/friends/request/:sender", function () {
    test("works for admin: accepts a friend request", async function () {
        const res = await request(app)
            .patch("/users/u3/friends/request/u1")
            .set("authorization", `Bearer ${adminToken}`);
            
        expect(res.body).toEqual({
            friendRequest: {
                username: "u1",
                firstName: "U1F",
                lastName: "U1L",
                requestStatus: true
            }
        });
    });

    test("works for user: accepts a friend request", async function () {
        const res = await request(app)
            .patch("/users/u3/friends/request/u1")
            .set("authorization", `Bearer ${u3Token}`);
            
        expect(res.body).toEqual({
            friendRequest: {
                username: "u1",
                firstName: "U1F",
                lastName: "U1L",
                requestStatus: true
            }
        });
    });

    test("unauth for wrong user", async function () {
        const res = await request(app)
            .patch("/users/u3/friends/request/u1")
            .set("authorization", `Bearer ${u2Token}`);
        
        expect(res.statusCode).toEqual(401);
    });

    test("unauth for wrong user", async function () {
        const res = await request(app)
            .patch("/users/u3/friends/request/u1")
        
        expect(res.statusCode).toEqual(401);
    });
});

/************************************** DELETE /users/:username/friends/request/:sender */
describe("DELETE /users/:username/friends/request/:sender", function () {
    test("works for admin: accepts a friend request", async function () {
        const res = await request(app)
            .delete("/users/u3/friends/request/u1")
            .set("authorization", `Bearer ${adminToken}`);
            
        expect(res.body).toEqual({
            friendRequest: undefined
        });

        const getRes = await request(app)
            .get("/users/u1/friends/request/u3")
            .set("authorization", `Bearer ${adminToken}`);
        
        expect(getRes.statusCode).toEqual(404);
    });

    test("works for user: accepts a friend request", async function () {
        const res = await request(app)
            .delete("/users/u3/friends/request/u1")
            .set("authorization", `Bearer ${u3Token}`);
            
        expect(res.body).toEqual({
            friendRequest: undefined
        });

        const getRes = await request(app)
            .get("/users/u1/friends/request/u3")
            .set("authorization", `Bearer ${u1Token}`);
        
        expect(getRes.statusCode).toEqual(404);
    });

    test("unauth for wrong user", async function () {
        const res = await request(app)
            .delete("/users/u3/friends/request/u1")
            .set("authorization", `Bearer ${u2Token}`);
        
        expect(res.statusCode).toEqual(401);
    });

    test("unauth for wrong user", async function () {
        const res = await request(app)
            .patch("/users/u3/friends/request/u1")
        
        expect(res.statusCode).toEqual(401);
    });
});
