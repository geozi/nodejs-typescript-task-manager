/**
 * User routes.
 * @module src/presentation/routes/user.route
 */
import { authenticateToken, verifyToken } from "../../auth/auth.controller";
import { registerUser, updateUserInfo } from "../controllers/user.controller";
import { Router } from "express";
const userRouter = Router();

userRouter.post("/register", ...registerUser);
userRouter.put("/update", ...verifyToken, authenticateToken, ...updateUserInfo);

export default userRouter;
