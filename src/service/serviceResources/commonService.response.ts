/**
 * Common service layer HTTP responses.
 * @module src/service/serviceResources/commonService
 */

/**
 * Contains common HTTP response messages provided by the service layer to the presentation layer.
 *
 * @memberof module:src/service/serviceResources/commonService
 * @type {Object}
 * @property {string} SERVER_ERROR - Message sent when a technical error occurs on the server side.
 */
const userServiceResponses = {
  /**
   * Message sent when a technical error occurs on the server side.
   * @memberof module:src/service/serviceResources/commonService
   * @type {string}
   */
  SERVER_ERROR: "Server error",
};

export default userServiceResponses;
