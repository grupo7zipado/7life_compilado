import DadosController from "../controllers/dadosControler.js";
import { Router } from "express";
import AutentificacaoJwt from "../fuctions/atentificacaoJwt.js";

const DadosRouter = Router();

DadosRouter
.get("/usuarios/:usu_id", AutentificacaoJwt, DadosController.DadosUsuarios)

;


export default DadosRouter
