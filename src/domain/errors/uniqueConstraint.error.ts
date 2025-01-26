/**
 * UniqueConstraint error.
 * @module src/domain/errors/uniqueConstraint.error
 */

/**
 * Custom error class for violation of uniqueness.
 * @extends {Error}
 */
export class UniqueConstraintError extends Error {
  public static httpCode = 409;

  /**
   * Creates an instance of UniqueConstraintError.
   * @param {string} message The error message.
   */
  constructor(message: string) {
    super(message);
    this.name = "UniqueConstraintError";
    this.message = message;
  }
}
