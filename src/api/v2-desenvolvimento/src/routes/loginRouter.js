import LoginController from "../controllers/loginController.js";
import { Router } from "express";

const LoginRouter = Router();

LoginRouter
.post("/login", LoginController.Login)
;


export default LoginRouter
