const {Client} = require ('pg');

const client = new Client({
    user: "postgres",
    host: "localhost",
    database: "synopticDB",
    password: "password",
    port: 5432,
});

client.connect();

module.exports = client;