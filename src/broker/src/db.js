const db = require("../../../db.json");
const mysql = require("mysql2/promise");


const config = {
    host: db.DB_HOST,
    port: db.DB_PORT,
    user: db.DB_USER,
    password: db.DB_PASSWORD,
    database: db.DB_NAME
}

let connection;

try {
    connection = mysql.createPool(config)
    console.log(connection);
} catch (error) {
    console.log(error)
}

module.exports = connection;