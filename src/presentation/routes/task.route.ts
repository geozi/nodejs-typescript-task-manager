/**
 * Task routes.
 * @module src/presentation/routes/task.route
 */
import { authenticateToken, verifyToken } from "../../auth/auth.controller";
import {
  createTask,
  updateTask,
  deleteTask,
  fetchTasksByStatus,
  fetchTasksByUsername,
  fetchTaskBySubject,
} from "../controllers/task.controller";
import { Router } from "express";
const taskRouter = Router();

taskRouter.post("/", ...verifyToken, authenticateToken, ...createTask);
taskRouter.put("/", ...verifyToken, authenticateToken, ...updateTask);
taskRouter.delete("/", ...verifyToken, authenticateToken, ...deleteTask);
taskRouter.get(
  "/status",
  ...verifyToken,
  authenticateToken,
  ...fetchTasksByStatus
);
taskRouter.get(
  "/username",
  ...verifyToken,
  authenticateToken,
  ...fetchTasksByUsername
);
taskRouter.get(
  "/subject",
  ...verifyToken,
  authenticateToken,
  ...fetchTaskBySubject
);

export default taskRouter;
