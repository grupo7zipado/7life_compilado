import { ImFeed } from "react-icons/im";
import _db from "../services/db.js";
const DadosUsuarios =  async (req, res)=>{
    try {
        const { usu_id } = req.params;

        if(usu_id != req.user.usu_id && req.user.usu_tipo != "admin"){
            return res.status(403).json({
                sucess:false
               ,message: "Sem permissão para acessar esses dados"
               ,data: null
            })
        }
        const dadosUsuarios = await _db.query("CALL proc_listar_dados_vitais_usuarios(?)", usu_id);
        return res.status(200).json({
                sucess:true
               ,message: "suscesso",
               data: dadosUsuarios[0][0]
            })

    } catch (error) {
        return res.status(500).json({
            sucess: false
           ,message:"Erro não indentificado"
           ,error: error
        })
    }
}
const DadosUsuariosUltimos =  async (req, res)=>{
    try {
        const { usu_id } = req.user;
        const dadosUsuarios = await _db.query("CALL proc_ultimos_dados_usuarios(?)", usu_id);
        console.log(dadosUsuarios[0][0][0]._sucess);
        if(dadosUsuarios[0][0][0]._sucess == 0){
            return res.status(403).json({
                sucess:false
               ,message: "Sem permissão para acessar esses dados"
               ,data: dadosUsuarios[0][0]
            })
        }
        return res.status(200).json({
            sucess:true
           ,message: "suscesso"
           ,data: dadosUsuarios[0][0]
        })
    } catch (error) {
        return res.status(500).json({
            sucess: false
           ,message:"Erro não indentificado"
           ,error: error
        })
    }
}

const DadosController = {
    DadosUsuarios
   ,DadosUsuariosUltimos
}

export default DadosController