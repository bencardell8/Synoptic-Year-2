const client = require("./database")

// function to load users into database
function loadTestData() {

    // test user 1
    client.query('INSERT INTO users (email, password, dollars, interest) VALUES ($1, $2, $3, $4)', ['bob@gmail.com', 'secure_password123', '500', '1.3'], (err) => {
        if (err) {
            console.error(err);
            console.log("Error likely caused by duplicate email.");
        } else {
            console.log('Test user 1 data saved to database.');
        }
    });

    // test user 2
    client.query('INSERT INTO users (email, password, dollars, interest) VALUES ($1, $2, $3, $4)', ['john@mail.net', 'password123567', '100', '1.0'], (err) => {
        if (err) {
            console.error(err);
            console.log("Error likely caused by duplicate email.");
        } else {
            console.log('Test user 2 data saved to database.');
        }
    });

    // test user 3
    client.query('INSERT INTO users (email, password, dollars, interest) VALUES ($1, $2, $3, $4)', ['tom@gmail.com', 'qwerty12345', '7500', '1.8'], (err) => {
        if (err) {
            console.error(err);
            console.log("Error likely caused by duplicate email.");
        } else {
            console.log('Test user 3 data saved to database.');
        }
    });

    // test user 4
    client.query('INSERT INTO users (email, password, dollars, interest) VALUES ($1, $2, $3, $4)', ['steve@gmail.com', 'verysecurepassword123', '233', '0.6'], (err) => {
        if (err) {
            console.error(err);
            console.log("Error likely caused by duplicate email.");
        } else {
            console.log('Test user 4 data saved to database.');
        }
    });


    // test user 5
    client.query('INSERT INTO users (email, password, dollars, interest) VALUES ($1, $2, $3, $4)', ['laura@example.com', 'securepassword123', '210', '1.6'], (err) => {
        if (err) {
            console.error(err);
            console.log("Error likely caused by duplicate email.");
        } else {
            console.log('Test user 5 data saved to database.');
        }
    });

    // test user 6
    client.query('INSERT INTO users (email, password, dollars, interest) VALUES ($1, $2, $3, $4)', ['jeff@example.com', '!password123!', '1500000', '1.7'], (err) => {
        if (err) {
            console.error(err);
            console.log("Error likely caused by duplicate email.");
        } else {
            console.log('Test user 6 data saved to database.');
        }
    });

    // test user 7
    client.query('INSERT INTO users (email, password, dollars, interest) VALUES ($1, $2, $3, $4)', ['chloe@testdomain.com', 'anothersecurepassword', '50', '1.2'], (err) => {
        if (err) {
            console.error(err);
            console.log("Error likely caused by duplicate email.");
        } else {
            console.log('Test user 7 data saved to database.');
        }
    });

    // test user 8
    client.query('INSERT INTO users (email, password, dollars, interest) VALUES ($1, $2, $3, $4)', ['rob@domain.net', 'passwordthatissecure123', '659', '0.4'], (err) => {
        if (err) {
            console.error(err);
            console.log("Error likely caused by duplicate email.");
        } else {
            console.log('Test user 8 data saved to database.');
        }
    });

    // test user 9
    client.query('INSERT INTO users (email, password, dollars, interest) VALUES ($1, $2, $3, $4)', ['rick@gmail.net', '1234567', '2600', '1.4'], (err) => {
        if (err) {
            console.error(err);
            console.log("Error likely caused by duplicate email.");
        } else {
            console.log('Test user 9 data saved to database.');
        }
    });

    // test user 10
    client.query('INSERT INTO users (email, password, dollars, interest) VALUES ($1, $2, $3, $4)', ['kate@gmail.domain', 'password1234', '135', '1.1'], (err) => {
        if (err) {
            console.error(err);
            console.log("Error likely caused by duplicate email.");
        } else {
            console.log('Test user 10 data saved to database.');
        }
    });
};

loadTestData();