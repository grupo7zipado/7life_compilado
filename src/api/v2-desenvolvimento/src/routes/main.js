import { Router } from "express";
import defaultRouter from "../fuctions/defaultRouter.js";
import UsuariosRouter from "./usuariosRouter.js";
const routers = Router();

routers
    .get("/", defaultRouter)
    .use("/", UsuariosRouter)
;

export default routers