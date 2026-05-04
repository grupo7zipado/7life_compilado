import { Router } from "express";
import defaultRouter from "../fuctions/defaultRouter.js";
import UsuariosRouter from "./usuariosRouter.js";
import LoginRouter from "./loginRouter.js";
import DadosRouter from "./dadosRouter.js";
import EspsRouter from "./espsRouter.js";
import UsuariosEspsRouter from "./usuariosEspsRouter.js";
const routers = Router();

routers
    .get("/", defaultRouter)
    .use("/usuarios", UsuariosRouter)
    .use("/", LoginRouter)
    .use("/dados", DadosRouter)
    .use("/esps", EspsRouter)
    .use("/usuariosEsps", UsuariosEspsRouter)
;

export default routers