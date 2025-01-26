/**
 * User routes.
 * @module src/presentation/routes/user.route
 */
import { verifyToken } from "../../auth/auth.controller";
import { registerUser, updateUserInfo } from "../controllers/user.controller";
import { Router } from "express";
const userRouter = Router();

userRouter.post("/register", ...registerUser);
userRouter.put("/update", ...verifyToken, ...updateUserInfo);

export default userRouter;
