import ByJwt from "./jwt.js";
const AutentificacaoJwt = (req, res, next)=>{
    const stringtoken = req.headers['authorization'];
    
    if (!stringtoken) {
        return res.status(401).json({ 
            sucess: false,
            error: "Token não enviado" 
        });
    }

    const token = stringtoken.split(" ")[1];
    if (!token) {
        return res.status(401).json({ 
            sucess: false,
            error: "Token não enviado"
        });
    }
    try {
        const decoded = ByJwt.validarToken(token);

        if(!decoded){
            return res.status(403).json({
            sucess: false, 
            error: "Token inválido" 
        });
        }
        console.log(decoded);
        
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(403).json({
            sucess: false, 
            error: "Token inválido" 
        });
    }
}

export default AutentificacaoJwt