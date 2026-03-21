require('dotenv').config();
const mysql = require("mysql2/promise");


const config = {
    host: "10.67.23.216",
    port: "3306",
    user: "us_des_222_sa3",
    password: "ab1506",
    database: "bd_tcc_des_222_sa3"
}

let connection;
console.log(connection);

try {
    connection = mysql.createPool(config)
} catch (error) {
    console.log(error)
}

module.exports = connection;