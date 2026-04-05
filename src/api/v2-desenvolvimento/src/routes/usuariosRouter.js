import usuariosController from "../controllers/usuariosController.js";
import { Router } from "express";

const UsuariosRouter = Router();

UsuariosRouter
.post("/usuarios", usuariosController.Cadastro)
.get("/usuarios/:usu_id", usuariosController.ListarId)
.get("/usuarios", usuariosController.Listar)

export default UsuariosRouter
