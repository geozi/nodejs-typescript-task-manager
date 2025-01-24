/**
 * Common service layer HTTP responses.
 * @module src/service/serviceResources/commonService.response
 */

/**
 * Contains common HTTP response messages provided by the service layer to the presentation layer.
 *
 * @memberof module:src/service/serviceResources/commonService.response
 * @type {Object}
 * @property {string} SERVER_ERROR - Message sent when a technical error occurs on the server side.
 */
const userServiceResponses = {
  /**
   * Message sent when a technical error occurs on the server side.
   * @memberof userServiceResponses
   * @type {string}
   */
  SERVER_ERROR: "Server error",
};

export default userServiceResponses;
