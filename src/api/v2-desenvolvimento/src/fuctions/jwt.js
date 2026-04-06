import jwt from "jsonwebtoken";

import config from "../config.json" with {type: "json"}

function gerarToken(payload) {
    return jwt.sign(payload, config.CHAVE_JWT, {
        expiresIn: "1h" // tempo de expiração
    });
}

function validarToken(token) {
    try {
        const decoded = jwt.verify(token, config.CHAVE_JWT);
        return decoded; // dados do payload
    } catch (err) {
        return null; // token inválido ou expirado
    }
}

const ByJwt = {
    gerarToken,
    validarToken
}

export default ByJwt