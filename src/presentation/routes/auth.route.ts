/**
 * Authentication routes.
 * @module src/presentation/routes/auth.route
 */
import authController from "../../auth/auth.controller";
import { Router } from "express";
const authRouter = Router();

authRouter.post("/", ...authController.loginUser);

export default authRouter;
