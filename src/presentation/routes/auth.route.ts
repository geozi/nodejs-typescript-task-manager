/**
 * Authentication routes.
 * @module src/presentation/routes/auth.route
 */
import { loginUser } from "../../auth/auth.controller";
import { Router } from "express";
const authRouter = Router();

authRouter.post("/", ...loginUser);

export default authRouter;
