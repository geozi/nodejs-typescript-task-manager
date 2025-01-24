/**
 * IUserUpdate interface.
 * @module src/presentation/interfaces/iUserUpdate.interface
 */

/**
 * Represents a data object used for updating a user profile.
 *
 * @interface
 * @memberof module:src/presentation/interfaces/iUserUpdate.interface
 * @property {string} id - The id of the user document.
 * @property {string} [username] - The username of the user (optional).
 * @property {string} [email] - The email of the user (optional).
 * @property {string} [password] - The password of the user (optional).
 */
interface IUserUpdate {
  /**
   * The id of the user document.
   * @memberof IUserUpdate
   * @type {string}
   */
  id: string;

  /**
   * The username of the user (optional).
   * @memberof IUserUpdate
   * @type {string}
   */
  username?: string;

  /**
   * The email of the user (optional).
   * @memberof IUserUpdate
   * @type {string}
   */
  email?: string;

  /**
   * The password of the user (optional).
   * @memberof IUserUpdate
   * @type {string}
   */
  password?: string;
}

export default IUserUpdate;
