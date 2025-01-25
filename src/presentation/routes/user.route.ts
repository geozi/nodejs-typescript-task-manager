/**
 * User routes.
 * @module src/presentation/routes/user.route
 */
import authController from "../../auth/auth.controller";
import userController from "../controllers/user.controller";
import { Router } from "express";
const userRouter = Router();

userRouter.post("/register", ...userController.registerUser);
userRouter.put(
  "/update",
  ...authController.verifyToken,
  ...userController.updateUserInfo
);

export default userRouter;
