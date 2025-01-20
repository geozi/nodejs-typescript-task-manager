/**
 * IUserUpdateAdmin interface.
 * @module src/presentation/interfaces/iUserUpdateAdmin
 */

/**
 * Represents a data object used for updating a user profile (as admin).
 *
 * @interface
 * @memberof module:src/presentation/interfaces/iUserUpdateAdmin
 * @description The caller must be logged in as an admin user.
 * @property {string} id - The id of the user document.
 * @property {string} role - The role assigned to the user profile.
 */
interface IUserUpdateAdmin {
  /**
   * The id of the user document.
   * @memberof module:src/presentation/interfaces/iUserUpdateAdmin
   * @type {string}
   */
  id: string;

  /**
   * The role assigned to the user profile.
   * @memberof module:src/presentation/interfaces/iUserUpdateAdmin
   * @type {string}
   */
  role: string;
}

export default IUserUpdateAdmin;
