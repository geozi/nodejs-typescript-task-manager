/**
 * IUserUpdate interface.
 * @module src/presentation/interfaces/iUserUpdate.interface
 */

import { Types } from "mongoose";

/**
 * Represents a data object used for updating a user profile.
 *
 * @interface
 * @property {string | Types.ObjectId} id - The id of the user document.
 * @property {string} [username] - The username of the user (optional).
 * @property {string} [email] - The email of the user (optional).
 * @property {string} [password] - The password of the user (optional).
 */
export interface IUserUpdate {
  /**
   * The id of the user document.
   * @type {string | Types.ObjectId}
   */
  id: string | Types.ObjectId;

  /**
   * The username of the user (optional).
   * @type {string}
   */
  username?: string;

  /**
   * The email of the user (optional).
   * @type {string}
   */
  email?: string;

  /**
   * The password of the user (optional).
   * @type {string}
   */
  password?: string;
}
