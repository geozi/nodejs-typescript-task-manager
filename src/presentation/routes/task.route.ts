/**
 * Task routes.
 * @module src/presentation/routes/task.route
 */
import { verifyToken } from "../../auth/auth.controller";
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

taskRouter.post("/", ...verifyToken, ...createTask);
taskRouter.put("/", ...verifyToken, ...updateTask);
taskRouter.delete("/", ...verifyToken, ...deleteTask);
taskRouter.get("/status", ...verifyToken, ...fetchTasksByStatus);
taskRouter.get("/username", ...verifyToken, ...fetchTasksByUsername);
taskRouter.get("/subject", ...verifyToken, ...fetchTaskBySubject);

export default taskRouter;
