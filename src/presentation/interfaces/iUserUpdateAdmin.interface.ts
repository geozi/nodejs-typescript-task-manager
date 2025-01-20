/**
 * IUserUpdateAdmin interface.
 * @module src/presentation/interfaces/iUserUpdateAdmin
 */

/**
 * Represents a data object used for updating a user profile (as an admin user).
 *
 * @interface
 * @memberof module:src/presentation/interfaces/iUserUpdateAdmin
 * @description The user using this data object must be logged in as an admin user.
 * @property {string} id - The id of the user document.
 * @property {string} role - The role assigned to the user profile.
 */
interface IUserUpdateAdmin {
  /**
   * The id of the user document.
   * @memberof IUserUpdateAdmin
   * @type {string}
   */
  id: string;

  /**
   * The role assigned to the user profile.
   * @memberof IUserUpdateAdmin
   * @type {string}
   */
  role: string;
}

export default IUserUpdateAdmin;
