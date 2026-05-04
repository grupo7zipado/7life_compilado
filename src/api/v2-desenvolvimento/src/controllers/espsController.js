import _db from "../services/db.js";

const CadastrarEsps = async (req, res)=>{
    try {
        const { esp_nome, esp_chave } = req.body;
        if(!(esp_nome && esp_chave)){
            return res.status(400).json({
                sucess: false
               ,message: "Invalid data"
            })
        }
        const cadastrarEsps = await _db.query("CALL proc_cadastro_esps_web(?, ?)", [esp_nome, esp_chave]);
        if(cadastrarEsps[0][0][0]._sucess == 0){
            return res.status(400).json({
                sucess: false
               ,message: cadastrarEsps[0][0][0]._message
            })
        }
        return res.status(200).json({
            sucess:true
           ,message: "suscesso"
           ,data: null
        })
    } catch (error) {
        return res.status(500).json({
            sucess: false
           ,message:"Erro não indentificado"
           ,error: error
        })
    }
}
const ListarEsps = async (req, res)=>{
    try {
        const user = req.user;
        const listarEsps = await _db.query("CALL proc_listar_esps(?)",[user.usu_id]);
        return res.status(200).json({
            sucess:true
           ,message: "suscesso"
           ,data: listarEsps[0][0]
        })
    } catch (error) {
        console.log(error);
        
        return res.status(500).json({
            sucess: false
           ,message:"Erro não indentificado"
           ,error: error
        })
    }
}

const EspsController = {
    CadastrarEsps,
    ListarEsps
}

export default EspsController