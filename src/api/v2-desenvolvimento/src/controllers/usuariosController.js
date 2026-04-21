import BySenha from "../fuctions/bcrypt.js";
import ValidarEmail from "../fuctions/validarEmail.js";
import _db from "../services/db.js";
import usuariosSql from "../sql/usuarios.js";
const usuariosController = {
    async Cadastro(req, res){
        try {
            const { 
                usu_nome
               ,usu_email
               ,usu_password
               ,usu_nascimento
               ,usu_tipo = "user"
            } = req.body;
            console.log([usu_nome, usu_email, usu_password, usu_nascimento, usu_tipo]);
            
            if(!(usu_nome && usu_email && usu_password && usu_nascimento && usu_tipo)){
                return res.status(400).json({
                    sucess:false
                   ,message: "Invalid data"
                })
            }
            
            if(!ValidarEmail(usu_email)){
                return res.status(422).json({
                    sucess:false
                   ,message: "Email invalido"
                })
            }

            const hashSenha = await BySenha.gerarHash(usu_password);

            const cadastrarUsuario = await _db.query(usuariosSql.InsertUsuarios, [usu_nome, usu_email, hashSenha, usu_nascimento, usu_tipo])
            if(!cadastrarUsuario[0][0][0]._sucess){
                return res.status(409).json({
                    sucess:false
                   ,message: cadastrarUsuario[0][0][0]._message
                })
            }
            return res.status(201).json({
                sucess:true
               ,message: "Usuário castrastrado"
            })
        } catch (error) {
            return res.status(500).json({
                sucess: false
               ,message:"Erro não indentificado"
               ,error: error
            })
        }
    }
    , async ListarId(req, res){
        try {
            const { usu_id } = req.params;
            if(!usu_id){
                return res.status(400).json({
                    sucess:false
                   ,message: "Invalid data"
                })
            }

            const dadosUsuarios = await _db.query( usuariosSql.SelectDataId, usu_id);
            
            if(dadosUsuarios[0].length > 0){
                return res.status(200).json({
                    sucess: true
                   ,message:"suscesso"
                   ,data: dadosUsuarios[0][0][0]
                })
            }else{
                return res.status(400).json({
                    sucess: false
                   ,message:"Usuário inexistente"
                })
            }

        } catch (error) {
            return res.status(500).json({
                sucess: false
               ,message:"Erro não indentificado"
               ,error: error
            })
        }
    }
    , async Listar(req, res){
        try {
            
            const { user } = req.user 

            
            const dadosUsuarios = await _db.query(usuariosSql.SelectData);

            return res.status(200).json({
                sucess: true
                ,message:"suscesso"
                ,data: dadosUsuarios[0]
            })
        } catch (error) {
            return res.status(500).json({
                sucess: false
               ,message:"Erro não indentificado"
               ,error: error
            })
        }
    }
}


export default usuariosController