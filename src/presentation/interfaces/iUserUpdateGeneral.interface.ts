/**
 * IUserUpdateGeneral interface.
 * @module src/presentation/interfaces/iUserUpdateGeneral
 */

/**
 * Represents a data object used for updating a user profile (as general).
 *
 * @interface
 * @memberof module:src/presentation/interfaces/iUserUpdateGeneral
 * @description The caller must be logged in as a general user.
 * @property {string} id - The id of the user document.
 * @property {string} username - The username of the user (optional).
 * @property {string} email - The email of the user (optional).
 * @property {password} password - The password of the user (optional).
 */
interface IUserUpdateGeneral {
  /**
   * The id of the user document.
   * @memberof src/presentation/interfaces/iUserUpdateGeneral
   * @type {string}
   */
  id: string;

  /**
   * The username of the user (optional).
   * @memberof src/presentation/interfaces/iUserUpdateGeneral
   * @type {string}
   */
  username?: string;

  /**
   * The email of the user (optional).
   * @memberof src/presentation/interfaces/iUserUpdateGeneral
   * @type {string}
   */
  email?: string;

  /**
   * The password of the user (optional).
   * @memberof src/presentation/interfaces/iUserUpdateGeneral
   * @type {string}
   */
  password?: string;
}

export default IUserUpdateGeneral;
