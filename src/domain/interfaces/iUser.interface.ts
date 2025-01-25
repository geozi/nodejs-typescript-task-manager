/**
 * IUser interface.
 * @module src/domain/interfaces/iUser.interface
 */
import { Document } from "mongoose";

/**
 * Represents a User.
 *
 * @interface
 * @extends {Document}
 * @property {string} username - The username of the user.
 * @property {string} email - The email of the user.
 * @property {string} password - The password of the user.
 */
interface IUser extends Document {
  /**
   * The username of the user.
   * @type {string}
   */
  username: string;

  /**
   * The email of the user.
   * @type {string}
   */
  email: string;

  /**
   * The password of the user.
   * @type {string}
   */
  password: string;
}

export default IUser;
