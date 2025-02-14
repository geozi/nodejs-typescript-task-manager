/**
 * NotFound error.
 * @module src/service/errors/notFound.error
 */

import { httpCodes } from "../../presentation/resources/responseStatusCodes";

/**
 * Custom error class for not founding the requested documents.
 * @extends {Error}
 */
export class NotFoundError extends Error {
  public static httpCode = httpCodes.NOT_FOUND;

  /**
   * Creates an instance of NotFoundError.
   * @param {string} message The error message.
   */
  constructor(message: string) {
    super(message);
    this.name = "NotFoundError";
    this.message = message;
  }
}
