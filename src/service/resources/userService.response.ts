/**
 * User-related service layer HTTP responses.
 * @module src/service/serviceResources/userService.response
 */

/**
 * Contains user-related HTTP response messages provided by the service layer to the presentation layer.
 *
 * @type {Object}
 * @property {string} USER_NOT_FOUND - Message sent when the requested user document is not found.
 * @property {string} USERS_NOT_FOUND - Message sent when the requested user documents are not found.
 * @property {string} USER_PROFILE_CREATED - Message sent when a new user profile is successfully created.
 * @property {string} USER_PROFILE_UPDATED - Message sent when an existing user profile is successfully updated.
 * @property {string} NO_USERS_IN_DB - Message sent when no users are found in the 'users' collection.
 */
const userServiceResponses = {
  /**
   * Message sent when the requested user document is not found.
   * @type {string}
   */
  USER_NOT_FOUND: "User was not found",

  /**
   * Message sent when the requested user documents are not found.
   * @type {string}
   */
  USERS_NOT_FOUND: "Users were not found",

  /**
   * Message sent when a user profile is successfully created.
   * @type {string}
   */
  USER_PROFILE_CREATED: "Successful creation of user profile ",

  /**
   * Message sent when a user profile is successfully updated.
   * @type {string}
   */
  USER_PROFILE_UPDATED: "Successful update of user profile",

  /**
   * Message sent when no users are found in the 'users' collection.
   * @type {string}
   */
  NO_USERS_IN_DB: "No users are registered in the database",
};

export default userServiceResponses;
