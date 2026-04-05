
import configs from "../config.json" with { type: "json" }
import mysql from "mysql2/promise";

const config = {
    host: configs.DB_HOST,
    port: configs.DB_PORT,
    user: configs.DB_USER,
    password: configs.DB_PASSWORD,
    database: configs.DB_NAME
}

let _db;

try {
    _db = mysql.createPool(config)
} catch (error) {
    _db.log(error)
}

export default _db;