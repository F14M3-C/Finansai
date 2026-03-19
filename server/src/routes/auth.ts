import { Router } from "express";

import * as AuthController from "../controllers/auth";

const authRouter = Router();

authRouter.get("/", AuthController.checkAuth);
authRouter.post("/login", AuthController.login);
authRouter.post("/register", AuthController.register);

export default authRouter;
