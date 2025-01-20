/**
 * ITaskUpdateGeneral interface.
 * @module src/presentation/interfaces/ITaskUpdateGeneral
 */

/**
 * Represents a data object for updating a task (as a general user).
 *
 * @interface
 * @memberof module:src/presentation/interfaces/ITaskUpdateGeneral
 * @description The user using this data object must be logged in as a general user.
 * @property {string} id - The id of the task document.
 * @property {string} [subject] - The subject of the task (optional).
 * @property {string} [description] - The description of the task (optional).
 * @property {string} [status] - The status of the task (optional).
 */
interface ITaskUpdateGeneral {
  /**
   * The id of the task document.
   * @memberof ITaskUpdateGeneral
   * @type {string}
   */
  id: string;

  /**
   * The subject of the task (optional).
   * @memberof ITaskUpdateGeneral
   * @type {string}
   */
  subject?: string;

  /**
   * The description of the task (optional).
   * @memberof ITaskUpdateGeneral
   * @type {string}
   */
  description?: string;

  /**
   * The status of the task (optional).
   * @memberof ITaskUpdateGeneral
   * @type {string}
   */
  status?: string;
}

export default ITaskUpdateGeneral;
