import usuariosController from "../controllers/usuariosController.js";
import { Router } from "express";
import AutentificacaoJwt from "../fuctions/atentificacaoJwt.js";

const UsuariosRouter = Router();

UsuariosRouter
.post("/", usuariosController.Cadastro)
.get("/:usu_id", usuariosController.ListarId)
.get("/", AutentificacaoJwt ,usuariosController.Listar)

export default UsuariosRouter
