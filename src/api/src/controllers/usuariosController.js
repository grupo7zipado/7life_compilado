// Imports
const jwt = require("jsonwebtoken");
// Conexao com banco
const db = require("../db/conection");
// SQL
const { SqlCadastroUsuario, SqlDadosUsuarios } = require("./sql");

const KEY = "TESTE"


const sqlEmailPass = "SELECT usuariosA.usu_id, usu_email, usu_password, usu_nome FROM usuariosA INNER JOIN usuarios ON usuariosA.usu_id = usuarios.usu_id WHERE usu_email = ?"

// Cadastro de Usuarios
const cadastroUsuarios = async (request, response)=>{
    try {

        // Recebe os dados do body
        const { usu_nome, usu_nascimento } = request.body;

        // Verifica se os dados do usuarios existem 
        if(!(usu_nome && usu_nascimento)){
            return response.status(400).json({
                message: "invalid data"
            })
        }

        // Cadastra o usuario
        const values = [ usu_nome, usu_nascimento]
        const res = await db.query( SqlCadastroUsuario , values);

        // Retorna sucesso
        return response.status(200).json({
            message:"suscesso",
            data: res
        })

    // Em caso de Erro
    } catch (error) {
        return response.status(400).json({
            message:"error",
            error: error
        })
    }
};


const dadosUsuarios = async (request, response)=>{
    try {

        // Recebe os dados do body
        const { usu_id } = request.params;

        // Verifica se os dados do usuarios existem 
        if(!usu_id){
            return response.status(400).json({
                message: "invalid data"
            })
        }

        // Cadastra o usuario
        const values = [ usu_id ]
        const res = await db.query( SqlDadosUsuarios , values);

        // Retorna sucesso
        return response.status(200).json({
            message:"suscesso",
            data: res[0]
        })

    // Em caso de Erro
    } catch (error) {
        return response.status(400).json({
            message:"error",
            error: error
        })
    }
}

const Login = async ( req, res )=>{
    try {
        const {usu_email, usu_password} = req.body;
        
        if(!(usu_email && usu_password)){
            return res.status(400).json({
                message: "invalid data"
            })
        }

        const [rows] = await db.query(sqlEmailPass, usu_email)

        if(rows.length > 0){
            if(rows[0].usu_password === usu_password){


                const token = jwt.sign(
                    { 
                        usu_id: rows[0].usu_id ,
                        usu_nome: rows[0].usu_nome,
                        usu_email: rows[0].usu_email
                    }, 
                    KEY, 
                    { 
                        expiresIn: "1h" 
                    }
                );

                
                return res.status(200).json({
                    message: "suscesso",
                    data: token
                })
            }
        }

        return res.status(400).json({
            message: "falha no login"
        })
    

    } catch (error) {
        console.log(error);
        
        return res.status(400).json({
            message:"error",
            error: error
        })
    }
}

// Exporta as Funcões
module.exports =  {cadastroUsuarios, dadosUsuarios, Login };