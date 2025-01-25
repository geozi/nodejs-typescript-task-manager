/**
 * Task controller.
 * @module src/presentation/controllers/task.controller
 */

import { validationResult } from "express-validator";
import responseMessages from "../resources/responseMessages";
import taskValidationRules from "../middleware/taskRules.validation";
import NotFoundError from "../../service/errors/notFound.error";
import ServerError from "../../service/errors/server.error";
import { Request, Response } from "express";
import Task from "../../domain/models/task.model";
import taskService from "../../service/task.service";
import ITaskUpdate from "../interfaces/iTaskUpdate.interface";

/**
 * Middleware array that contains task creation logic.
 *
 * @memberof module:src/presentation/controllers/task.controller
 * @type {Array<Object>}
 * @property {ValidationChain[]} taskCreationRules - Express validation rules for task creation.
 * @property {Function} anonymousAsyncFunction - Handles task creation requests and responses.
 */
const createTask = [
  ...taskValidationRules.taskCreationRules(),
  /**
   * Processes HTTP requests for task creation.
   *
   * @memberof createTask
   * @async @function anonymousAsyncFunction
   * @param {Request} req - An HTTP request.
   * @param {Response} res - An HTTP response.
   * @returns {Promise<void>} A promise that resolves to void.
   */
  async (req: Request, res: Response): Promise<void> => {
    const expressErrors = validationResult(req);
    if (!expressErrors.isEmpty()) {
      const errorMessage = expressErrors.array().map((err) => ({
        message: err.msg,
      }));

      res
        .status(400)
        .json({ message: responseMessages.BAD_REQUEST, errors: errorMessage });
    }

    try {
      const { subject, description, status, username } = req.body;
      const newTask = new Task({
        subject: subject,
        description: description,
        status: status,
        username: username,
      });
      await taskService.createTaskRecord(newTask);
      res.status(201).json({ message: responseMessages.TASK_CREATED });
    } catch (error: ServerError | unknown) {
      let serverErrorMessage;
      if (error instanceof ServerError) {
        serverErrorMessage = error.message;
      }

      res.status(ServerError.httpCode).json({ message: serverErrorMessage });
    }
  },
];

/**
 * Middleware array that contains task update logic.
 *
 * @memberof module:src/presentation/controllers/task.controller
 * @type {Array<Object>}
 * @property {ValidationChain[]} taskUpdateRules - Express validation rules for task update.
 * @property {Function} anonymousAsyncFunction - Handles task update requests and responses.
 */
const updateTask = [
  ...taskValidationRules.taskUpdateRules(),

  /**
   * Processes HTTP requests for task update.
   *
   * @memberof updateTask
   * @async @function anonymousAsyncFunction
   * @param {Request} req - An HTTP request.
   * @param {Response} res - An HTTP response.
   * @returns {Promise<void>} - A promise that resolves to void.
   */
  async (req: Request, res: Response): Promise<void> => {
    const expressErrors = validationResult(req);
    if (!expressErrors.isEmpty()) {
      const errorMessage = expressErrors.array().map((err) => ({
        message: err.msg,
      }));

      res
        .status(400)
        .json({ message: responseMessages.BAD_REQUEST, errors: errorMessage });
    }

    try {
      const { id, subject, description, status } = req.body;
      const taskUpdateInfo: ITaskUpdate = {
        id: id,
        subject: subject,
        description: description,
        status: status,
      };
      await taskService.updateTaskRecord(taskUpdateInfo);
      res.status(200).json({ message: responseMessages.TASK_UPDATED });
    } catch (error: NotFoundError | ServerError | unknown) {
      if (error instanceof NotFoundError) {
        res.status(NotFoundError.httpCode).json({ message: error.message });
      }

      let message;
      if (error instanceof ServerError) {
        message = error.message;
      }

      res.status(ServerError.httpCode).json({ message: message });
    }
  },
];

/**
 * Middleware array that contains task deletion logic.
 *
 * @memberof module:src/presentation/controllers/task.controller
 * @type {Array<Object>}
 * @property {ValidationChain[]} taskDeletionRules - Express validation rules for task deletion.
 * @property {Function} anonymousAsyncFunction - Handles task deletion requests and responses.
 */
const deleteTask = [
  ...taskValidationRules.taskDeletionRules(),

  /**
   * Processes HTTP requests for task deletion.
   *
   * @memberof deleteTask
   * @async @function anonymousAsyncFunction
   * @param {Request} req - An HTTP request.
   * @param {Response} res - An HTTP response.
   * @returns {Promise<void>} - A promise that resolves to void.
   */
  async (req: Request, res: Response): Promise<void> => {
    const expressErrors = validationResult(req);
    if (!expressErrors.isEmpty()) {
      const errorMessage = expressErrors.array().map((err) => ({
        message: err.msg,
      }));

      res
        .status(400)
        .json({ message: responseMessages.BAD_REQUEST, errors: errorMessage });
    }

    try {
      const { id } = req.body;
      await taskService.deleteTaskRecord(id);
      res.status(204).json({});
    } catch (error) {
      if (error instanceof NotFoundError) {
        res.status(NotFoundError.httpCode).json({ message: error.message });
      }

      let message;
      if (error instanceof ServerError) {
        message = error.message;
      }

      res.status(ServerError.httpCode).json({ message: message });
    }
  },
];

/**
 * Middleware array that contains username-based task fetching logic.
 *
 * @memberof module:src/presentation/controllers/task.controller
 * @type {Array<Object>}
 * @property {ValidationChain[]} taskFetchingByUsernameRules - Express validation rules for username-based task fetching.
 * @property {Function} anonymousAsyncFunction - Handles requests and responses for username-based task fetching.
 */
const fetchTasksByUsername = [
  ...taskValidationRules.taskFetchingByUsernameRules(),

  /**
   * Processes HTTP requests for username-based task fetching.
   *
   * @memberof fetchTasksByUsername
   * @async @function anonymousAsyncFunction
   * @param {Request} req - An HTTP request.
   * @param {Response} res - An HTTP response.
   * @returns {Promise<void>} - A promise that resolves to void.
   */
  async (req: Request, res: Response): Promise<void> => {
    const expressErrors = validationResult(req);
    if (!expressErrors.isEmpty()) {
      const errorMessage = expressErrors.array().map((err) => ({
        message: err.msg,
      }));

      res
        .status(400)
        .json({ message: responseMessages.BAD_REQUEST, errors: errorMessage });
    }

    try {
      const { username } = req.body;
      const tasks = await taskService.retrieveTasksByUsername(username);
      res.status(200).json({ data: tasks });
    } catch (error) {
      if (error instanceof NotFoundError) {
        res.status(NotFoundError.httpCode).json({ message: error.message });
      }

      let message;
      if (error instanceof ServerError) {
        message = error.message;
      }

      res.status(ServerError.httpCode).json({ message: message });
    }
  },
];

/**
 * Middleware array that contains subject-based task fetching.
 *
 * @memberof module:src/presentation/controllers/task.controller
 * @type {Array<Object>}
 * @property {ValidationChain[]} taskFetchingBySubjectRules - Express validation rules for subject-based task fetching.
 * @property {Function} anonymousAsyncFunction - Handles requests and responses for subject-based task fetching.
 */
const fetchTaskBySubject = [
  ...taskValidationRules.taskFetchingBySubjectRules(),

  /**
   * Processes HTTP requests for subject-based task fetching.
   *
   * @memberof fetchTaskBySubject
   * @async @function anonymousAsyncFunction
   * @param {Request} req - An HTTP request.
   * @param {Response} res - An HTTP response.
   * @returns {Promise<void>} - A promise that resolves to void.
   */
  async (req: Request, res: Response): Promise<void> => {
    const expressErrors = validationResult(req);
    if (!expressErrors.isEmpty()) {
      const errorMessage = expressErrors.array().map((err) => ({
        message: err.msg,
      }));

      res
        .status(400)
        .json({ message: responseMessages.BAD_REQUEST, errors: errorMessage });
    }

    try {
      const { subject } = req.body;
      const task = await taskService.retrieveTaskBySubject(subject);
      res.status(200).json({ data: task });
    } catch (error) {
      if (error instanceof NotFoundError) {
        res.status(NotFoundError.httpCode).json({ message: error.message });
      }

      let message;
      if (error instanceof ServerError) {
        message = error.message;
      }

      res.status(ServerError.httpCode).json({ message: message });
    }
  },
];

/**
 * Middleware array that contains status-based task fetching.
 *
 * @memberof module:src/presentation/controllers/task.controller
 * @type {Array<Object>}
 * @property {ValidationChain[]} taskFetchingByStatusRules - Express validation rules for status-based task fetching.
 * @property {Function} anonymousAsyncFunction - Handles requests and responses for status-based task fetching.
 */
const fetchTasksByStatus = [
  ...taskValidationRules.taskFetchingByStatusRules(),

  /**
   * Processes HTTP requests for subject-based task fetching.
   *
   * @memberof fetchTasksByStatus
   * @async @function anonymousAsyncFunction
   * @param {Request} req - An HTTP request.
   * @param {Response} res - An HTTP response.
   * @returns {Promise<void>} - A promise that resolves to void.
   */
  async (req: Request, res: Response): Promise<void> => {
    const expressErrors = validationResult(req);
    if (!expressErrors.isEmpty()) {
      const errorMessage = expressErrors.array().map((err) => ({
        message: err.msg,
      }));

      res
        .status(400)
        .json({ message: responseMessages.BAD_REQUEST, errors: errorMessage });
    }
    try {
      const { status } = req.body;
      const tasks = await taskService.retrieveTasksByStatus(status);
      res.status(200).json({ data: tasks });
    } catch (error) {
      if (error instanceof NotFoundError) {
        res.status(NotFoundError.httpCode).json({ message: error.message });
      }

      let message;
      if (error instanceof ServerError) {
        message = error.message;
      }

      res.status(ServerError.httpCode).json({ message: message });
    }
  },
];

export default {
  createTask,
  updateTask,
  deleteTask,
  fetchTasksByUsername,
  fetchTaskBySubject,
  fetchTasksByStatus,
};
