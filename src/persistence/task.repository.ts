/**
 * Task repository.
 * @module src/persistence/task
 */
import mongoose from "mongoose";
import Task from "../domain/models/task.model";
import ITask from "../domain/interfaces/iTask.interface";

/**
 * Returns all tasks persisted in the 'tasks' collection.
 *
 * @memberof module:src/persistence/task
 * @async
 * @function getTasks
 * @returns {Promise<Array<Object>>} - A promise that resolves to an array of task objects.
 */
const getTasks = async () => {
  return await Task.find({});
};

/**
 * Returns all tasks with the specified status.
 *
 * @memberof module:src/persistence/task
 * @async
 * @function getTasksByStatus
 * @param {string} status - The current status of the task.
 * @returns {Promise<Array<Object>>} - A promise that resolves to an array of task objects.
 */
const getTasksByStatus = async (status: string) => {
  return await Task.find({ status: status });
};

/**
 * Returns all tasks with the specified username.
 *
 * @memberof module:src/persistence/task
 * @async
 * @function getTasksByUsername
 * @param {string} username - The username of the task author.
 * @returns {Promise<Array<Object>>} - A promise that resolves to an array of task objects.
 */
const getTasksByUsername = async (username: string) => {
  return await Task.find({ username: username });
};

/**
 * Returns the task with the specified subject.
 *
 * @memberof module:src/persistence/task
 * @async
 * @function getTaskBySubject
 * @param {string} subject - The subject of the task.
 * @returns {Promise<Object>} - A promise that resolves to a task object.
 */
const getTaskBySubject = async (subject: string) => {
  return await Task.findOne({ subject: subject });
};

/**
 * Adds a new task to the 'tasks' collection.
 *
 * @memberof module:src/persistence/task
 * @async
 * @function addTask
 * @param {ITask} newTask - The new task to be added.
 * @returns {Promise<Object>} - A promise that resolves to the saved document in the form of a task object.
 */
const addTask = async (newTask: ITask) => {
  return await newTask.save();
};

/**
 * Updates the fields of a specified task.
 *
 * @memberof module:src/persistence/task
 * @async
 * @function updateTask
 * @param {mongoose.Types.ObjectId} id - The id of the task document.
 * @param updateDataObj - The new data to be persisted.
 * @returns {Promise<Object>} - A promise that resolves to the task object after update.
 */
const updateTask = async (
  id: mongoose.Types.ObjectId,
  updateDataObj: object
) => {
  return await Task.findByIdAndUpdate(id, updateDataObj, {
    new: true,
    runValidators: true,
    context: "query",
  });
};

/**
 * Deletes a task.
 *
 * @memberof module:src/persistence/task
 * @async
 * @function
 * @param {mongoose.Types.ObjectId} id - The id of the task document.
 * @returns {Promise<Object>} - A promise that resolves to the deleted document in the form of a user object.
 */
const deleteTask = async (id: mongoose.Types.ObjectId) => {
  return await Task.findByIdAndDelete(id);
};

export default {
  getTasks,
  getTasksByStatus,
  getTasksByUsername,
  getTaskBySubject,
  addTask,
  updateTask,
  deleteTask,
};
