/**
 * Task repository.
 * @module src/persistence/task.repository
 */
import mongoose from "mongoose";
import Task from "../domain/models/task.model";
import { ITask } from "../domain/interfaces/iTask.interface";

/**
 * Returns all tasks with the specified status.
 *
 * @param {string} status The current status of the task.
 * @returns {Promise<Array<ITask>>} A promise that resolves to an array of task objects or an empty array.
 */
export const getTasksByStatus = async (
  status: string
): Promise<Array<ITask>> => {
  return await Task.find({ status: status });
};

/**
 * Returns all tasks with the specified username.
 *
 * @param {string} username The username of the task author.
 * @returns {Promise<Array<ITask>>} A promise that resolves to an array of task objects or an empty array.
 */
export const getTasksByUsername = async (
  username: string
): Promise<Array<ITask>> => {
  return await Task.find({ username: username });
};

/**
 * Returns the task with the specified subject.
 *
 * @param {string} subject The subject of the task.
 * @returns {Promise<ITask | null>} A promise that resolves to a task object or null.
 */
export const getTaskBySubject = async (
  subject: string
): Promise<ITask | null> => {
  return await Task.findOne({ subject: subject });
};

/**
 * Adds a new task to the 'tasks' collection.
 *
 * @param {ITask} newTask The new task to be added.
 * @returns {Promise<ITask>} A promise that resolves to the saved document in the form of a task object.
 */
export const addTask = async (newTask: ITask): Promise<ITask> => {
  return await newTask.save();
};

/**
 * Updates the fields of a specified task.
 *
 * @param {mongoose.Types.ObjectId} id The id of the task document.
 * @param {Object} updateDataObj The new data to be persisted.
 * @returns {Promise<ITask | null>} A promise that resolves to the task object after update or null.
 */
export const updateTask = async (
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
 * @param {mongoose.Types.ObjectId} id The id of the task document.
 * @returns {Promise<ITask | null>} A promise that resolves to the deleted document in the form of a user object or null.
 */
export const deleteTask = async (
  id: mongoose.Types.ObjectId
): Promise<ITask | null> => {
  return await Task.findByIdAndDelete(id);
};
