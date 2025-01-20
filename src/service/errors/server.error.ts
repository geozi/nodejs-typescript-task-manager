/**
 * Server error.
 * @module src/service/errors/server
 */

/**
 * Custom error class for technical issues arising at the backend (500).
 *
 * @memberof module:src/service/errors/server
 * @extends {Error}
 */
class ServerError extends Error {
  public httpCode = 500;

  /**
   * Creates an instance of ServerError.
   * @memberof module:src/service/errors/server
   * @param {string} message The error message
   */
  constructor(message: string) {
    super(message);
    this.name = "ServerError";
    this.message = message;
  }
}

export default ServerError;
