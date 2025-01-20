/**
 * ITask interface.
 * @module src/domain/interfaces/iTask
 */
import { Document } from "mongoose";

/**
 * Represents a Task.
 *
 * @interface
 * @memberof module:src/domain/interfaces/iTask
 * @extends {Document}
 * @property {string} subject The subject of the task.
 * @property {string} description The description of the task.
 * @property {string} status The status of the task.
 * @property {string} username The username of the task.
 */
interface ITask extends Document {
  /**
   * The subject of the task.
   * @memberof module:src/domain/interfaces/iTask
   * @type {string}
   */
  subject: string;

  /**
   * The description of the task.
   * @memberof module:src/domain/interfaces/iTask
   * @type {string}
   */
  description: string;

  /**
   * The status of the task.
   * @memberof module:src/domain/interfaces/iTask
   * @type {string}
   */
  status: string;

  /**
   * The username of the task.
   * @memberof module:src/domain/interfaces/iTask
   * @type {string}
   */
  username: string;
}

export default ITask;
