import { Router } from "express";
import defaultRouter from "../fuctions/defaultRouter.js";
import UsuariosRouter from "./usuariosRouter.js";
import LoginRouter from "./loginRouter.js";
import DadosRouter from "./dadosRouter.js";
const routers = Router();

routers
    .get("/", defaultRouter)
    .use("/usuarios", UsuariosRouter)
    .use("/", LoginRouter)
    .use("/dados", DadosRouter)
;

export default routers