/**
 * IToken interface.
 * @module src/auth/interfaces/iToken.interface
 */

/**
 * Represents a web token.
 *
 * @interface
 * @property {string} username - The username of the logged in user.
 *
 */
export interface IToken {
  /**
   *  The username of the logged in user.
   * @type {string}
   */
  username: string;
}
