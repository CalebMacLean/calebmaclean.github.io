// Enable strict mode
"use strict";

// Imports
const db = require("../db");
const User = require("../models/user");
const Friend = require("../models/friend");
const List = require("../models/list");
const { createToken } = require("../helpers/tokens");

async function commonBeforeAll() {
    // noinspection sqlWithoutWhere
    await db.query("DELETE FROM users");
    // noinspection sqlWithoutWhere
    await db.query("DELETE FROM friends");
    // noinspection sqlWithoutWhere
    await db.query("DELETE FROM lists");
    await db.query("ALTER SEQUENCE lists_id_seq RESTART WITH 1")

    // Insert test users
    await User.register({
        username: "u1",
        firstName: "U1F",
        lastName: "U1L",
        email: "u1@email.com",
        password: "password1",
        isAdmin: false
    });
    await User.register({
        username: "u2",
        firstName: "U2F",
        lastName: "U2L",
        email: "u2@email.com",
        password: "password2",
        isAdmin: false
    });
    await User.register({
        username: "u3",
        firstName: "U3F",
        lastName: "U3L",
        email: "u3@email.com",
        password: "password3",
        isAdmin: false
    });
    await User.register({
        username: "u4",
        firstName: "U4F",
        lastName: "U4L",
        email: "u4@email.com",
        password: "password4",
        isAdmin: false
    });
    await User.register({
        username: "u5",
        firstName: "U5F",
        lastName: "U5L",
        email: "u5@email.com",
        password: "password5",
        isAdmin: false
    });

    // Insert a friend request
    const request1 = await Friend.request("u1", "u3");
    // console.log("req1: ", request1);

    const request2 = await Friend.request("u3", "u4");
    // console.log("req2: ", request2);

    const request3 = await Friend.request("u5", "u3", true);
    // console.log("req3: ", request3);

    const request4 = await Friend.request("u4", "u2", true);
    // console.log("req4: ", request4);

    const request5 = await Friend.request("u3", "u2");
    // console.log("req5: ", request5);

    const request6 = await Friend.request("u5", "u2")
    // console.log("req6: ", request6);

    // Insert into lists
    const list1 = await List.add({
        title: "Example List",
        username: "u1",
        listType: true
    });
    console.log(list1);

}

async function commonBeforeEach() {
    await db.query("BEGIN");
}

async function commonAfterEach() {
    await db.query("ROLLBACK");
}

async function commonAfterAll() {
    await db.end();
}


const u1Token = createToken({ username: "u1", isAdmin: false });
const u2Token = createToken({ username: "u2", isAdmin: false });
const u3Token = createToken({ username: "u3", isAdmin: false });
const u5Token = createToken({ username: "u5", isAdmin: false });
const adminToken = createToken({ username: "admin", isAdmin: true });

// Exports
module.exports = {
    commonBeforeAll,
    commonBeforeEach,
    commonAfterEach,
    commonAfterAll,
    u1Token,
    u2Token,
    u3Token,
    u5Token,
    adminToken
}