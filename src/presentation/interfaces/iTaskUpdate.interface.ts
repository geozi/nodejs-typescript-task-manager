/**
 * ITaskUpdate interface.
 * @module src/presentation/interfaces/iTaskUpdate.interface
 */

/**
 * Represents a data object for updating a task.
 *
 * @interface
 * @memberof module:src/presentation/interfaces/iTaskUpdate.interface
 * @property {string} id - The id of the task document.
 * @property {string} [subject] - The subject of the task (optional).
 * @property {string} [description] - The description of the task (optional).
 * @property {string} [status] - The status of the task (optional).
 */
interface ITaskUpdate {
  /**
   * The id of the task document.
   * @memberof ITaskUpdate
   * @type {string}
   */
  id: string;

  /**
   * The subject of the task (optional).
   * @memberof ITaskUpdate
   * @type {string}
   */
  subject?: string;

  /**
   * The description of the task (optional).
   * @memberof ITaskUpdate
   * @type {string}
   */
  description?: string;

  /**
   * The status of the task (optional).
   * @memberof ITaskUpdate
   * @type {string}
   */
  status?: string;
}

export default ITaskUpdate;
