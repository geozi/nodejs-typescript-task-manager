/**
 * ITask interface.
 * @module src/domain/interfaces/iTask.interface
 */
import { Document } from "mongoose";

/**
 * Represents a Task.
 *
 * @interface
 * @extends {Document}
 * @property {string} subject The subject of the task.
 * @property {string} description The description of the task.
 * @property {string} status The status of the task.
 * @property {string} username The username of the task.
 */
export interface ITask extends Document {
  /**
   * The subject of the task.
   * @type {string}
   */
  subject: string;

  /**
   * The description of the task.
   * @type {string}
   */
  description: string;

  /**
   * The status of the task.
   * @type {string}
   */
  status: string;

  /**
   * The username of the task.
   * @type {string}
   */
  username: string;
}
