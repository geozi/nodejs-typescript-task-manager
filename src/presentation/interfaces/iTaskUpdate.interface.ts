/**
 * ITaskUpdate interface.
 * @module src/presentation/interfaces/iTaskUpdate.interface
 */

/**
 * Represents a data object for updating a task.
 *
 * @interface
 * @property {string} id - The id of the task document.
 * @property {string} [subject] - The subject of the task (optional).
 * @property {string} [description] - The description of the task (optional).
 * @property {string} [status] - The status of the task (optional).
 */
export interface ITaskUpdate {
  /**
   * The id of the task document.
   * @type {string}
   */
  id: string;

  /**
   * The subject of the task (optional).
   * @type {string}
   */
  subject?: string;

  /**
   * The description of the task (optional).
   * @type {string}
   */
  description?: string;

  /**
   * The status of the task (optional).
   * @type {string}
   */
  status?: string;
}
