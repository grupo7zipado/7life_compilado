import bcrypt from "bcrypt";

async function gerarHash(senha) {
    const saltRounds = 10; // pode aumentar pra mais segurança
    const hash = await bcrypt.hash(senha, saltRounds);
    return hash;
}

async function validarSenha(senhaDigitada, hashSalvo) {
    const valido = await bcrypt.compare(senhaDigitada, hashSalvo);
    return valido; // true ou false
}

const  BySenha = { gerarHash, validarSenha }
export default BySenha