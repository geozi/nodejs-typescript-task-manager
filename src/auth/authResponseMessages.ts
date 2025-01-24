/**
 * Auth response messages.
 * @module src/auth/authResponseMessages
 */

/**
 * Contains auth response messages.
 *
 * @memberof module:src/auth/authResponseMessages
 * @type {Object}
 * @property {string} AUTH_FAILED - Message sent when authentication has failed.
 * @property {string} AUTH_SUCCESS - Message sent when authentication is successful.
 * @property {string} AUTH_HEADER_REQUIRED - Message sent when the login request does not contain an authorization header.
 * @property {string} TOKEN_INVALID - Message sent when the token in the request is invalid.
 */
const authResponses = {
  /**
   * Message sent when authentication has failed.
   *
   * @memberof authResponses
   * @type {string}
   */
  AUTH_FAILED: "Authentication failed",

  /**
   * Message sent when authentication is successful.
   *
   * @memberof authResponses
   * @type {string}
   */
  AUTH_SUCCESS: "Login successful",

  /**
   * Message sent when the login request does not contain an authorization header.
   *
   * @memberof authResponses
   * @type {string}
   */
  AUTH_HEADER_REQUIRED: "Authorization header is required",

  /**
   * Message sent when the token in the request is invalid.
   *
   * @memberof authResponses
   * @type {string}
   */
  TOKEN_INVALID: "Invalid token",
};

export default authResponses;
