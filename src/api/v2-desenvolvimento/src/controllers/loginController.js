import BySenha from "../fuctions/bcrypt.js";
import ByJwt from "../fuctions/jwt.js";
import ValidarEmail from "../fuctions/validarEmail.js";
import _db from "../services/db.js";
import LoginSql from "../sql/loginSql.js";


const LoginController = {
    async Login(req, res){
        try {
            const {
                usu_email
               ,usu_password
            } = req.body;

            if(!( usu_email && usu_password)){
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

            const LoginUsuarios = await _db.query(LoginSql.Login, usu_email)
            if(!LoginUsuarios[0][0][0]._sucess){
                if(LoginUsuarios[0][0][0]._message == "Usuário inativo"){
                    return res.status(403).json({
                        sucess:false
                       ,message: "Usuário inativo"
                    })
                }
                return res.status(404).json({
                    sucess:false
                   ,message: "Email não cadastrado"
                })
            }else{
                const senhaValida = await BySenha.validarSenha(usu_password, LoginUsuarios[0][0][0].usu_password)              
                if(senhaValida){
                    const bodyToken = {
                        usu_id: LoginUsuarios[0][0][0].usu_id,
                        usu_email: LoginUsuarios[0][0][0].usu_email,
                        usu_tipo: LoginUsuarios[0][0][0].usu_tipo
                    }
                    const dadosUsuario = {
                        usu_email: LoginUsuarios[0][0][0].usu_email,
                        usu_nome: LoginUsuarios[0][0][0].usu_nome,
                        usu_nascimento: LoginUsuarios[0][0][0].usu_nascimento
                    }
                    const token = ByJwt.gerarToken(bodyToken)
                    const body = {
                        token: token,
                        usuario: dadosUsuario
                    }

                    return res.status(200).json({
                        sucess:true
                        ,message: "Login feito com sucesso"
                        ,data: body
                    })
                }else{
                   return res.status(403).json({
                        sucess:false
                       ,message: "Erro acesso negado"
                    }) 
                }
            }

        } catch (error) {
            return res.status(500).json({
                sucess: false
               ,message:"Erro não indentificado"
               ,error: error
            })
        }
    }
}


export default LoginController