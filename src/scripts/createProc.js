// utils/mysqlProcedure.js
import fs from 'fs';
import path from 'path';
import mysql from 'mysql2/promise';
import { log } from 'console';
import { exit } from 'process';
const config = {
    "DB_HOST": "10.67.22.216",
    "DB_PORT": "3306",
    "DB_USER": "us_des_222_sa3",
    "DB_PASSWORD": "ab1506",
    "DB_NAME": "bd_tcc_des_222_sa3"
}


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