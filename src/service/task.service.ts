/**
 * Task service.
 *
 * @module src/service/task
 * @async @function retrieveTasksByStatus
 * @async @function retrieveTasksByUsername
 * @async @function retrieveTaskBySubject
 * @async @function createTaskRecord
 * @async @function updateTaskRecord
 * @async @function deleteTaskRecord
 */

import mongoose from "mongoose";
import ITask from "../domain/interfaces/iTask.interface";
import taskRepository from "../persistence/task.repository";
import ITaskUpdate from "../presentation/interfaces/iTaskUpdate.interface";
import NotFoundError from "./errors/notFound.error";
import ServerError from "./errors/server.error";
import commonServiceResponses from "./serviceResources/commonService.response";
import taskServiceResponses from "./serviceResources/taskService.response";

/**
 * Calls on the persistence layer to retrieve all tasks having the specified status.
 *
 * @memberof module:src/service/task
 * @async @function retrieveTasksByStatus
 * @param {string} status The status of a task.
 * @returns {Promise<Array<ITask>>} A promise that resolves to an array of task objects.
 * @throws {NotFoundError | ServerError}
 */
const retrieveTasksByStatus = async (status: string): Promise<Array<ITask>> => {
  try {
    const tasks = await taskRepository.getTasksByStatus(status);
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
 * @memberof module:src/service/task
 * @async @function retrieveTasksByUsername
 * @param {string} username The username of the task's author.
 * @returns {Promise<Array<ITask>>} A promise that resolves to an array of task objects.
 * @throws {NotFoundError | ServerError}
 */
const retrieveTasksByUsername = async (
  username: string
): Promise<Array<ITask>> => {
  try {
    const tasks = await taskRepository.getTasksByUsername(username);
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
 * @memberof module:src/service/task
 * @async @function retrieveTaskBySubject
 * @param {string} subject The subject of the task.
 * @returns {Promise<ITask>} A promise that resolves to a task object.
 * @throws {NotFoundError | ServerError}
 */
const retrieveTaskBySubject = async (subject: string): Promise<ITask> => {
  try {
    const task = await taskRepository.getTaskBySubject(subject);
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
 * @memberof module:src/service/task
 * @async @function createTaskRecord
 * @param {ITask} newTask The new task to be added.
 * @returns {Promise<ITask>} A promise that resolves to the newly saved task object.
 * @throws {ServerError}
 */
const createTaskRecord = async (newTask: ITask) => {
  try {
    return await taskRepository.addTask(newTask);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    throw new ServerError(commonServiceResponses.SERVER_ERROR);
  }
};

/**
 * Calls on the persistence layer to update a task (as a general user).
 *
 * @memberof module:src/service/task
 * @async @function updateTaskRecord
 * @param {ITaskUpdateGeneral} taskUpdateInfo A custom type object containing the new information to be added to an existing task.
 * @returns {Promise<ITask>} A promise that resolves to the updated task object.
 * @throws {NotFoundError | ServerError}
 */
const updateTaskRecord = async (
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

    const updatedTask = await taskRepository.updateTask(
      idAsObjectId,
      taskToUpdate
    );

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
 * @memberof module:src/service/task
 * @async @function deleteTaskRecord
 * @param {string} id The id of the task.
 * @returns {Promise<ITask>} A promise that resolves to the deleted task object.
 * @throws {NotFoundError | ServerError}
 */
const deleteTaskRecord = async (id: string): Promise<ITask> => {
  try {
    const idAsObjectId = new mongoose.Types.ObjectId(id);
    const deletedTask = await taskRepository.deleteTask(idAsObjectId);
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

export default {
  retrieveTasksByStatus,
  retrieveTasksByUsername,
  retrieveTaskBySubject,
  createTaskRecord,
  updateTaskRecord,
  deleteTaskRecord,
};
