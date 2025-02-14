/**
 * Task controller.
 * @module src/presentation/controllers/task.controller
 */
import { validationResult } from "express-validator";
import { responseMessages } from "../resources/responseMessages";
import {
  taskCreationRules,
  taskUpdateRules,
  taskDeletionRules,
  taskFetchingByStatusRules,
  taskFetchingBySubjectRules,
  taskFetchingByUsernameRules,
} from "../middleware/taskRules.validation";
import { NotFoundError } from "../../service/errors/notFound.error";
import { ServerError } from "../../persistence/errors/server.error";
import { Request, Response } from "express";
import Task from "../../domain/models/task.model";
import {
  retrieveTaskBySubject,
  retrieveTasksByStatus,
  retrieveTasksByUsername,
  createTaskRecord,
  updateTaskRecord,
  deleteTaskRecord,
} from "../../service/task.service";
import { ITaskUpdate } from "../interfaces/iTaskUpdate.interface";
import { UniqueConstraintError } from "../../domain/errors/uniqueConstraint.error";
import { httpCodes } from "../resources/responseStatusCodes";

/**
 * Middleware array that contains task creation logic.
 *
 * @type {Array<Object>}
 * @property {ValidationChain[]} taskCreationRules - Express validation rules for task creation.
 * @property {Function} anonymousAsyncFunction - Handles task creation requests and responses.
 */
export const createTask = [
  ...taskCreationRules(),
  /**
   * Processes HTTP requests for task creation.
   *
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

      await res
        .status(httpCodes.BAD_REQUEST)
        .json({ message: responseMessages.BAD_REQUEST, errors: errorMessage });
      return;
    }

    try {
      const { subject, description, status, username } = req.body;
      const newTask = new Task({
        subject: subject,
        description: description,
        status: status,
        username: username,
      });
      await createTaskRecord(newTask);
      await res
        .status(httpCodes.CREATED)
        .json({ message: responseMessages.TASK_CREATED });
    } catch (error: ServerError | UniqueConstraintError | unknown) {
      if (error instanceof UniqueConstraintError) {
        await res
          .status(UniqueConstraintError.httpCode)
          .json({ message: error.message });
        return;
      }

      if (error instanceof ServerError) {
        await res.status(ServerError.httpCode).json({ message: error.message });
        return;
      }
    }
  },
];

/**
 * Middleware array that contains task update logic.
 *
 * @type {Array<Object>}
 * @property {ValidationChain[]} taskUpdateRules - Express validation rules for task update.
 * @property {Function} anonymousAsyncFunction - Handles task update requests and responses.
 */
export const updateTask = [
  ...taskUpdateRules(),

  /**
   * Processes HTTP requests for task update.
   *
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

      await res
        .status(httpCodes.BAD_REQUEST)
        .json({ message: responseMessages.BAD_REQUEST, errors: errorMessage });
      return;
    }

    try {
      const { id, subject, description, status } = req.body;
      const taskUpdateInfo: ITaskUpdate = {
        id: id,
        subject: subject,
        description: description,
        status: status,
      };
      await updateTaskRecord(taskUpdateInfo);
      await res
        .status(httpCodes.OK)
        .json({ message: responseMessages.TASK_UPDATED });
    } catch (error: NotFoundError | ServerError | unknown) {
      if (error instanceof NotFoundError) {
        await res
          .status(NotFoundError.httpCode)
          .json({ message: error.message });
        return;
      }

      if (error instanceof ServerError) {
        await res.status(ServerError.httpCode).json({ message: error.message });
        return;
      }
    }
  },
];

/**
 * Middleware array that contains task deletion logic.
 *
 * @type {Array<Object>}
 * @property {ValidationChain[]} taskDeletionRules - Express validation rules for task deletion.
 * @property {Function} anonymousAsyncFunction - Handles task deletion requests and responses.
 */
export const deleteTask = [
  ...taskDeletionRules(),

  /**
   * Processes HTTP requests for task deletion.
   *
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

      await res
        .status(httpCodes.BAD_REQUEST)
        .json({ message: responseMessages.BAD_REQUEST, errors: errorMessage });
      return;
    }

    try {
      const { id } = req.body;
      await deleteTaskRecord(id);
      await res.status(httpCodes.NO_CONTENT).json({});
    } catch (error: NotFoundError | ServerError | unknown) {
      if (error instanceof NotFoundError) {
        await res
          .status(NotFoundError.httpCode)
          .json({ message: error.message });
        return;
      }

      if (error instanceof ServerError) {
        await res.status(ServerError.httpCode).json({ message: error.message });
        return;
      }
    }
  },
];

/**
 * Middleware array that contains username-based task fetching logic.
 *
 * @type {Array<Object>}
 * @property {ValidationChain[]} taskFetchingByUsernameRules - Express validation rules for username-based task fetching.
 * @property {Function} anonymousAsyncFunction - Handles requests and responses for username-based task fetching.
 */
export const fetchTasksByUsername = [
  ...taskFetchingByUsernameRules(),

  /**
   * Processes HTTP requests for username-based task fetching.
   *
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

      await res
        .status(httpCodes.BAD_REQUEST)
        .json({ message: responseMessages.BAD_REQUEST, errors: errorMessage });
      return;
    }

    try {
      const { username } = req.body;
      const tasks = await retrieveTasksByUsername(username);
      await res.status(httpCodes.OK).json({ data: tasks });
    } catch (error: NotFoundError | ServerError | unknown) {
      if (error instanceof NotFoundError) {
        await res
          .status(NotFoundError.httpCode)
          .json({ message: error.message });
        return;
      }

      if (error instanceof ServerError) {
        await res.status(ServerError.httpCode).json({ message: error.message });
        return;
      }
    }
  },
];

/**
 * Middleware array that contains subject-based task fetching.
 *
 * @type {Array<Object>}
 * @property {ValidationChain[]} taskFetchingBySubjectRules - Express validation rules for subject-based task fetching.
 * @property {Function} anonymousAsyncFunction - Handles requests and responses for subject-based task fetching.
 */
export const fetchTaskBySubject = [
  ...taskFetchingBySubjectRules(),

  /**
   * Processes HTTP requests for subject-based task fetching.
   *
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

      await res
        .status(httpCodes.BAD_REQUEST)
        .json({ message: responseMessages.BAD_REQUEST, errors: errorMessage });
      return;
    }

    try {
      const { subject } = req.body;
      const task = await retrieveTaskBySubject(subject);
      await res.status(httpCodes.OK).json({ data: task });
    } catch (error: NotFoundError | ServerError | unknown) {
      if (error instanceof NotFoundError) {
        await res
          .status(NotFoundError.httpCode)
          .json({ message: error.message });
        return;
      }

      if (error instanceof ServerError) {
        await res.status(ServerError.httpCode).json({ message: error.message });
        return;
      }
    }
  },
];

/**
 * Middleware array that contains status-based task fetching.
 *
 * @type {Array<Object>}
 * @property {ValidationChain[]} taskFetchingByStatusRules - Express validation rules for status-based task fetching.
 * @property {Function} anonymousAsyncFunction - Handles requests and responses for status-based task fetching.
 */
export const fetchTasksByStatus = [
  ...taskFetchingByStatusRules(),

  /**
   * Processes HTTP requests for subject-based task fetching.
   *
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

      await res
        .status(httpCodes.BAD_REQUEST)
        .json({ message: responseMessages.BAD_REQUEST, errors: errorMessage });
      return;
    }
    try {
      const { status } = req.body;
      const tasks = await retrieveTasksByStatus(status);
      await res.status(httpCodes.OK).json({ data: tasks });
    } catch (error: NotFoundError | ServerError | unknown) {
      if (error instanceof NotFoundError) {
        await res
          .status(NotFoundError.httpCode)
          .json({ message: error.message });
        return;
      }

      if (error instanceof ServerError) {
        await res.status(ServerError.httpCode).json({ message: error.message });
        return;
      }
    }
  },
];
