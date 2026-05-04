import usuariosEspController from "../controllers/usuariosEspController.js";
import { Router } from "express";
import AutentificacaoJwt from "../fuctions/atentificacaoJwt.js";

const UsuariosEspsRouter = Router();

UsuariosEspsRouter
.post("/", AutentificacaoJwt , usuariosEspController.Cadastro)


export default UsuariosEspsRouter
