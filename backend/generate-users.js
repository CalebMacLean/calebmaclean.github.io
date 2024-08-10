const { faker } = require('@faker-js/faker');
const bcrypt = require('bcrypt');
const { BCRYPT_WORK_FACTOR } = require("./config");
const { Client } = require('pg');
require("dotenv").config();

// Database connection configuration
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_HOST = process.env.DB_HOST;
const DB_PORT = process.env.DB_PORT;

const client = new Client({
    user: DB_USER,
    password: DB_PASSWORD,
    database: 'pomodoro',
    host: DB_HOST,
    port: DB_PORT
});

// Function to generate insert statements for lists
const generateListRow = (name) => {
    // create variables to store insert vals
    const title = faker.lorem.words(3);
    const username = name;
    const listType = faker.datatype.boolean();
    // return the sql query string
    const query = `INSERT INTO lists (title, username, list_type) VALUES ('${title}', '${username}', ${listType});`
    // console.log("generateListRow: ",query);
    return query;
}

// Function to generate SQL insert statements
const generateUserAndListRow = async () => {
    const username = faker.internet.userName();
    const password = await bcrypt.hash(faker.internet.password(), BCRYPT_WORK_FACTOR); // Note: This should be hashed in a real-world application
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const email = faker.internet.email();
    const avatar = faker.image.avatar(); // Using Faker's avatar generator
    const numPomodoros = faker.number.int({ min: 0, max: 100 }); // Random number of Pomodoros
    const isAdmin = faker.datatype.boolean(); // Randomly true or false

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        throw new Error(`Invalid email format: ${email}`);
    }

    const userQuery = `
    INSERT INTO users (username, password, first_name, last_name, email, avatar, num_pomodoros, is_admin)
    VALUES ('${username}', '${password}', '${firstName}', '${lastName}', '${email}', '${avatar}', ${numPomodoros}, ${isAdmin});
    `
    const listQuery = generateListRow(username);
    // console.log("generateUserAndListRow: ",listQuery);

    return {userQuery, listQuery};
};

// Generate multiple rows
const generateAndInsertUsers = async (numUsers) => {
    // connect to the database
    await client.connect();
    try {
        // iterate through the range between 0 and numUsers
        for ( let i = 0; i < numUsers; i++ ) {
            const {userQuery, listQuery} = await generateUserAndListRow();
            // console.log("generateAndInsertUsers: ", listQuery);
            await client.query(userQuery);
            await client.query(listQuery);
        }
    }
    catch (err) {
        console.error(err);
    }
    finally {
        await client.end();
    }
    // let rows = '';
    // for (let i = 0; i < numUsers; i++) {
    //     rows += await generateUserAndListRow();
    // }
    // return rows;
};

// Main function to run the script
const main = async () => {
    const numUsers = 10; // Number of rows to generate
    const sqlStatements = await generateAndInsertUsers(numUsers);
    console.log(sqlStatements);
};

main();