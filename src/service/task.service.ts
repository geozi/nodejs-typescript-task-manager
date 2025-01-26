/**
 * Task service.
 * @module src/service/task.service
 */
import mongoose from "mongoose";
import { ITask } from "../domain/interfaces/iTask.interface";
import {
  getTaskBySubject,
  getTasksByStatus,
  getTasksByUsername,
  addTask,
  updateTask,
  deleteTask,
} from "../persistence/task.repository";
import { ITaskUpdate } from "../presentation/interfaces/iTaskUpdate.interface";
import { NotFoundError } from "./errors/notFound.error";
import { ServerError } from "../persistence/errors/server.error";
import { commonServiceResponses } from "./resources/commonService.response";
import { taskServiceResponses } from "./resources/taskService.response";
import { UniqueConstraintError } from "../domain/errors/uniqueConstraint.error";

/**
 * Calls on the persistence layer to retrieve all tasks having the specified status.
 *
 * @param {string} status The status of a task.
 * @returns {Promise<Array<ITask>>} A promise that resolves to an array of task objects.
 * @throws {NotFoundError | ServerError}
 */
export const retrieveTasksByStatus = async (
  status: string
): Promise<Array<ITask>> => {
  try {
    const tasks = await getTasksByStatus(status);
    if (tasks.length === 0) {
      throw new NotFoundError(taskServiceResponses.TASKS_NOT_FOUND);
    }

    return tasks;
  } catch (error) {
    if (error instanceof NotFoundError) {
      throw error;
    }
    throw new ServerError(commonServiceResponses.SERVER_ERROR);
  }
};

/**
 * Calls on the persistence layer to retrieve all tasks having the specified username.
 *
 * @param {string} username The username of the task's author.
 * @returns {Promise<Array<ITask>>} A promise that resolves to an array of task objects.
 * @throws {NotFoundError | ServerError}
 */
export const retrieveTasksByUsername = async (
  username: string
): Promise<Array<ITask>> => {
  try {
    const tasks = await getTasksByUsername(username);
    if (tasks.length === 0) {
      throw new NotFoundError(taskServiceResponses.TASKS_NOT_FOUND);
    }

    return tasks;
  } catch (error) {
    if (error instanceof NotFoundError) {
      throw error;
    }
    throw new ServerError(commonServiceResponses.SERVER_ERROR);
  }
};

/**
 * Calls on the persistence layer to retrieve a task with the specified subject.
 *
 * @param {string} subject The subject of the task.
 * @returns {Promise<ITask>} A promise that resolves to a task object.
 * @throws {NotFoundError | ServerError}
 */
export const retrieveTaskBySubject = async (
  subject: string
): Promise<ITask> => {
  try {
    const task = await getTaskBySubject(subject);
    if (task === null) {
      throw new NotFoundError(taskServiceResponses.TASK_NOT_FOUND);
    }

    return task;
  } catch (error) {
    if (error instanceof NotFoundError) {
      throw error;
    }
    throw new ServerError(commonServiceResponses.SERVER_ERROR);
  }
};

/**
 * Calls on the persistence layer to add a new task to the database.
 *
 * @param {ITask} newTask The new task to be added.
 * @returns {Promise<ITask>} A promise that resolves to the newly saved task object.
 * @throws {UniqueConstraintError | ServerError}
 */
export const createTaskRecord = async (newTask: ITask) => {
  try {
    return await addTask(newTask);
  } catch (error) {
    if (error instanceof UniqueConstraintError) {
      throw new UniqueConstraintError(error.message);
    }
    throw new ServerError(commonServiceResponses.SERVER_ERROR);
  }
};

/**
 * Calls on the persistence layer to update a task (as a general user).
 *
 * @param {ITaskUpdateGeneral} taskUpdateInfo A custom type object containing the new information to be added to an existing task.
 * @returns {Promise<ITask>} A promise that resolves to the updated task object.
 * @throws {NotFoundError | ServerError}
 */
export const updateTaskRecord = async (
  taskUpdateInfo: ITaskUpdate
): Promise<ITask> => {
  try {
    const { id, subject, description, status } = taskUpdateInfo;
    const idAsObjectId = new mongoose.Types.ObjectId(id);
    const taskToUpdate = {
      subject: subject,
      description: description,
      status: status,
    };

    const updatedTask = await updateTask(idAsObjectId, taskToUpdate);

    if (updatedTask === null) {
      throw new NotFoundError(taskServiceResponses.TASK_NOT_FOUND);
    }
    return updatedTask;
  } catch (error) {
    if (error instanceof NotFoundError) {
      throw error;
    }
    throw new ServerError(commonServiceResponses.SERVER_ERROR);
  }
};

/**
 * Calls on the persistence layer to delete a task.
 *
 * @param {string} id The id of the task.
 * @returns {Promise<ITask>} A promise that resolves to the deleted task object.
 * @throws {NotFoundError | ServerError}
 */
export const deleteTaskRecord = async (id: string): Promise<ITask> => {
  try {
    const idAsObjectId = new mongoose.Types.ObjectId(id);
    const deletedTask = await deleteTask(idAsObjectId);
    if (deletedTask === null) {
      throw new NotFoundError(taskServiceResponses.TASK_NOT_FOUND);
    }

    return deletedTask;
  } catch (error) {
    if (error instanceof NotFoundError) {
      throw error;
    }

    throw new ServerError(commonServiceResponses.SERVER_ERROR);
  }
};
