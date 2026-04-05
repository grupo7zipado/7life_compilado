// Imports
// Cria as rotas
const express = require("express")
// Funções da rota
const { cadastroUsuarios, dadosUsuarios, Login} = require("../controllers/usuariosController");

// Cria as rotas
const usuariosRouter = express.Router();

// Asocia a funções as rotas
// Cadastra os usuarios
usuariosRouter.post("/usuarios", cadastroUsuarios);
usuariosRouter.get("/usuarios/:usu_id", dadosUsuarios);
usuariosRouter.post("/login", Login)
// Exporta
module.exports = { usuariosRouter}
