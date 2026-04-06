import { Router } from "express";
import defaultRouter from "../fuctions/defaultRouter.js";
import UsuariosRouter from "./usuariosRouter.js";
import LoginRouter from "./loginRouter.js";
const routers = Router();

routers
    .get("/", defaultRouter)
    .use("/", UsuariosRouter)
    .use("/", LoginRouter)
;

export default routers