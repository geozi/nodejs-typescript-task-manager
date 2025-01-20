/**
 * Task repository.
 *
 * @module src/persistence/task
 * @async @function getTasks
 * @async @function getTasksByStatus
 * @async @function getTasksByUsername
 * @async @function getTaskBySubject
 * @async @function addTask
 * @async @function updateTask
 * @async @function deleteTask
 */
import mongoose from "mongoose";
import Task from "../domain/models/task.model";
import ITask from "../domain/interfaces/iTask.interface";

/**
 * Returns all tasks persisted in the 'tasks' collection.
 *
 * @memberof module:src/persistence/task
 * @async @function getTasks
 * @returns {Promise<Array<ITask>>} A promise that resolves to an array of task objects or an empty array.
 */
const getTasks = async (): Promise<Array<ITask>> => {
  return await Task.find({});
};

/**
 * Returns all tasks with the specified status.
 *
 * @memberof module:src/persistence/task
 * @async @function getTasksByStatus
 * @param {string} status The current status of the task.
 * @returns {Promise<Array<ITask>>} A promise that resolves to an array of task objects or an empty array.
 */
const getTasksByStatus = async (status: string): Promise<Array<ITask>> => {
  return await Task.find({ status: status });
};

/**
 * Returns all tasks with the specified username.
 *
 * @memberof module:src/persistence/task
 * @async @function getTasksByUsername
 * @param {string} username The username of the task author.
 * @returns {Promise<Array<ITask>>} A promise that resolves to an array of task objects or an empty array.
 */
const getTasksByUsername = async (username: string): Promise<Array<ITask>> => {
  return await Task.find({ username: username });
};

/**
 * Returns the task with the specified subject.
 *
 * @memberof module:src/persistence/task
 * @async @function getTaskBySubject
 * @param {string} subject The subject of the task.
 * @returns {Promise<ITask | null>} A promise that resolves to a task object or null.
 */
const getTaskBySubject = async (subject: string): Promise<ITask | null> => {
  return await Task.findOne({ subject: subject });
};

/**
 * Adds a new task to the 'tasks' collection.
 *
 * @memberof module:src/persistence/task
 * @async @function addTask
 * @param {ITask} newTask The new task to be added.
 * @returns {Promise<ITask>} A promise that resolves to the saved document in the form of a task object.
 */
const addTask = async (newTask: ITask) => {
  return await newTask.save();
};

/**
 * Updates the fields of a specified task.
 *
 * @memberof module:src/persistence/task
 * @async @function updateTask
 * @param {mongoose.Types.ObjectId} id The id of the task document.
 * @param {Object} updateDataObj The new data to be persisted.
 * @returns {Promise<ITask | null>} A promise that resolves to the task object after update or null.
 */
const updateTask = async (
  id: mongoose.Types.ObjectId,
  updateDataObj: object
): Promise<ITask | null> => {
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
 * @async @function
 * @param {mongoose.Types.ObjectId} id The id of the task document.
 * @returns {Promise<ITask | null>} A promise that resolves to the deleted document in the form of a user object or null.
 */
const deleteTask = async (
  id: mongoose.Types.ObjectId
): Promise<ITask | null> => {
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
