import _db from "../services/db.js";
const DadosUsuarios =  async (req, res)=>{
    try {
        const { usu_id } = req.user;
        console.log(req.user);
        return res.status(200).json({
                sucess:true
               ,message: "Usuário castrastrado",
               data: req.user
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
}

export default DadosController