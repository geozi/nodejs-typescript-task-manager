/**
 * Task routes.
 * @module src/presentation/routes/task.route
 */
import authController from "../../auth/auth.controller";
import taskController from "../controllers/task.controller";
import { Router } from "express";
const taskRouter = Router();

taskRouter.post(
  "/",
  ...authController.verifyToken,
  ...taskController.createTask
);
taskRouter.put(
  "/",
  ...authController.verifyToken,
  ...taskController.updateTask
);
taskRouter.delete(
  "/",
  ...authController.verifyToken,
  ...taskController.deleteTask
);
taskRouter.get(
  "/status",
  ...authController.verifyToken,
  ...taskController.fetchTasksByStatus
);
taskRouter.get(
  "/username",
  ...authController.verifyToken,
  ...taskController.fetchTasksByUsername
);
taskRouter.get(
  "/subject",
  ...authController.verifyToken,
  ...taskController.fetchTaskBySubject
);

export default taskRouter;
