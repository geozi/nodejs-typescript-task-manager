/**
 * NotFound error.
 * @module src/service/errors/notFound
 */

/**
 * Custom error class for not founding the requested documents (404).
 *
 * @memberof module:src/service/errors/notFound
 * @extends {Error}
 */
class NotFoundError extends Error {
  public httpCode = 404;

  /**
   * Creates an instance of NotFoundError.
   * @memberof module:src/service/errors/notFound
   * @param {string} message The error message.
   */
  constructor(message: string) {
    super(message);
    this.name = "NotFoundError";
    this.message = message;
  }
}

export default NotFoundError;
