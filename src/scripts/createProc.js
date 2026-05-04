// utils/mysqlProcedure.js
import fs from 'fs';
import path from 'path';
import mysql from 'mysql2/promise';
import { log } from 'console';
import { exit } from 'process';

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'tcctestes',
    waitForConnections: true,
    connectionLimit: 10,
    multipleStatements: true
});

async function createProcedure() {
    try {
        const caminho = path.resolve('/home/sombrah/Projetos/7life_compilado/src/banco/v3-demo/procedures-script');
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