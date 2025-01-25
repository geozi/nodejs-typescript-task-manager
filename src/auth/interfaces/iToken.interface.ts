/**
 * IToken interface.
 * @module src/auth/interfaces/iToken.interface
 */

/**
 * Represents a web token.
 *
 * @interface
 * @memberof module:src/auth/interfaces/iToken.interface
 * @property {string} username - The username of the logged in user.
 *
 */
interface IToken {
  /**
   *  The username of the logged in user.
   *
   * @memberof IToken
   * @type {string}
   */
  username: string;
}

export default IToken;
