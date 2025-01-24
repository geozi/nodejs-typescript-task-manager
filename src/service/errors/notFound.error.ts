/**
 * NotFound error.
 * @module src/service/errors/notFound.error
 */

/**
 * Custom error class for not founding the requested documents (404).
 *
 * @memberof module:src/service/errors/notFound.error
 * @extends {Error}
 */
class NotFoundError extends Error {
  public static httpCode = 404;

  /**
   * Creates an instance of NotFoundError.
   * @memberof NotFoundError
   * @param {string} message The error message.
   */
  constructor(message: string) {
    super(message);
    this.name = "NotFoundError";
    this.message = message;
  }
}

export default NotFoundError;
