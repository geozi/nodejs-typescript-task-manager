/**
 * Server error.
 * @module src/persistence/errors/server.error
 */

import { httpCodes } from "../../presentation/resources/responseStatusCodes";

/**
 * Custom error class for technical issues arising at the backend (500).
 * @extends {Error}
 */
export class ServerError extends Error {
  public static httpCode = httpCodes.INTERNAL_SERVER_ERROR;

  /**
   * Creates an instance of ServerError.
   * @param {string} message The error message
   */
  constructor(message: string) {
    super(message);
    this.name = "ServerError";
    this.message = message;
  }
}
