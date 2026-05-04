import {Router} from 'express';
import EspsController from '../controllers/espsController.js';
import AutentificacaoJwt from '../fuctions/atentificacaoJwt.js';

const EspsRouter = Router();

EspsRouter
.post("/", EspsController.CadastrarEsps)
.get("/", AutentificacaoJwt, EspsController.ListarEsps)
;

export default EspsRouter;