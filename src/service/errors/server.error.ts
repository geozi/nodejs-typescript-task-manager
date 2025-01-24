/**
 * Server error.
 * @module src/service/errors/server.error
 */

/**
 * Custom error class for technical issues arising at the backend (500).
 *
 * @memberof module:src/service/errors/server.error
 * @extends {Error}
 */
class ServerError extends Error {
  public static httpCode = 500;

  /**
   * Creates an instance of ServerError.
   * @memberof ServerError
   * @param {string} message The error message
   */
  constructor(message: string) {
    super(message);
    this.name = "ServerError";
    this.message = message;
  }
}

export default ServerError;
