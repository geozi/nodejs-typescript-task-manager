/**
 * BadRequest error.
 * @module src/presentation/errors/BadRequestError
 */

/**
 * Custom error class for bad HTTP requests (400).
 *
 * @memberof module:src/presentation/errors/BadRequestError
 * @extends {Error}
 */
class BadRequestError extends Error {
  public httpCode = 400;

  /**
   * Creates an instance of BadRequestError.
   * @memberof module:src/presentation/errors/BadRequestError
   * @param {string} message - The error message
   */
  constructor(message: string) {
    super(message);
    this.name = "BadRequestError";
    this.message = message;
  }
}

export default BadRequestError;
