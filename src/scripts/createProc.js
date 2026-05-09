// utils/mysqlProcedure.js
import fs from 'fs';
import path from 'path';
import mysql from 'mysql2/promise';
import { log } from 'console';
import { exit } from 'process';
import config from "../../db.json" with { type: "json" }


const pool = mysql.createPool({
    host: config.DB_HOST,
    user: config.DB_USER,
    password: config.DB_PASSWORD,
    database: config.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    multipleStatements: true
});

async function createProcedure() {
    try {
        const caminho = path.resolve('../7life_compilado/src/banco/v3-demo/procedures-script');
        console.log(caminho);
        const arquivos = fs.readdirSync(caminho);
        console.log(arquivos);
        const connection = await pool.getConnection();

        for (let i = 0; i < arquivos.length; i++) {
            const arquivo = path.join(caminho, arquivos[i]);
            const sql =   fs.readFileSync(arquivo, 'utf8');
            const res = await connection.query(sql);
            console.log(`Procedure executada: ${arquivo}`);
        }
        await connection.release();
    } catch (error) {
        console.error('Erro ao executar procedure:', error.message);
    }
}
await createProcedure()
exit(0);