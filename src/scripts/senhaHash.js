/*
    SCRIPT QUE TRANSOFRMA SENHAS SEM HASH EM SENHAS COM HASH BCRYPT 
    UTILIZAR APENAS UMA VEZ 

    PERIGO NÃO EXECUTE MAIS DE UMA VEZ COM SUCESSO SENHÃO QUEBRA AS SENHAS

    LEIA COM ATENÇÃO OS COMENTARIOS
*/


import bcrypt from "bcrypt";
import mysql from "mysql2/promise";

// ALTERAR AS CONFIGURAÇÕES PARA SUA BASE DE DADOS UTILIZADA E A QUANTIDADE DE PULOS QUE UTILIZA NO BCRYPT
const configs = {
   "DB_HOST": "localhost"
   ,"DB_PORT": "3306"
   ,"DB_USER": "root"
   ,"DB_PASSWORD": ""
   ,"DB_NAME": "tcctestes"
   ,"PULOS": 10
}

async function gerarHash(senha) {
    const hash = await bcrypt.hash(senha, configs.PULOS);
    return hash;
}

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
/*
    SELECT (campo da senha), (campo do id da tabela) FROM (tabela em que a senha está) 
    OBS - utilizar o WHERE filtrando caso nescesario
*/
const SenhasSemHash = "SELECT usu_id, usu_password FROM usuariosA";

/*
    UPDATE (tabela em que a senha está) SET (campo da senha) = ?  WHERE (campo do id da tabela) = ?
*/
const SenhaUpdate = "UPDATE usuariosA SET usu_password = ? WHERE usu_id = ?" ;
const Main = async () =>{
    //retorna as senhas a serem alteradas
    const res = await _db.query(SenhasSemHash);
    const itens = res[0]
    for (let i = 0; i < itens.length; i++) {
        const hash = await gerarHash(itens[i].usu_password);
        console.log(hash);
        // enviar o hash gerado e o id da tabela
        await _db.query(SenhaUpdate, [hash, itens[i].usu_id])
    }
    //fexa conexão e encera o script
    await _db.end();
}

Main()

