// utils/mysqlProcedure.js
import fs from 'fs';
import path from 'path';
import mysql from 'mysql2/promise';
import { log } from 'console';
import { exit } from 'process';
import configs from "../../db.json" with { type: "json" }
import { Main } from './senhaHash.js';

const config = {
    host: configs.DB_HOST,
    port: configs.DB_PORT,
    user: configs.DB_USER,
    password: configs.DB_PASSWORD,
    database: configs.DB_NAME
}
let _db
try {
    _db = mysql.createPool(config)
} catch (error) {
    _db.log(error)
}

async function ABC() {
    try {
        

        const tabelas = path.resolve('../7life_compilado/src/banco/v3-demo/scriptReset.sql');
        const reset = fs.readFileSync(tabelas, 'utf-8')
        await _db.query(reset)

        // // await connection.query(reset)
        // // await connection.release();
    } catch (error) {
        console.error('Erro ao executar procedure:', error.message);
    }
}
await ABC()
exit(0);