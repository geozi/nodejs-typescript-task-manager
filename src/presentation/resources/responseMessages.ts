/**
 * HTTP response messages.
 * @module src/presentation/resources/responseMessages
 */

/**
 * Contains HTTP response messages.
 *
 * @type {Object}
 * @property {string} USER_REGISTERED - Message sent when a new user profile is successfully created.
 * @property {string} USER_UPDATED - Message sent when an existing user profile is successfully updated.
 * @property {string} TASK_CREATED - Message sent when a new task is created.
 * @property {string} TASK_UPDATED - Message sent when an existing task is successfully updated.
 * @property {string} BAD_REQUEST - Message sent when one or more request fields fail express validation rules.
 */
export const responseMessages = {
  /**
   * Message sent when a new user profile is successfully created.
   * @type {string}
   */
  USER_REGISTERED: "Successful user registration",

  /**
   * Message sent when an existing user profile is successfully updated.
   * @type {string}
   */
  USER_UPDATED: "Successful user update",

  /**
   * Message sent when a new task is created.
   * @type {string}
   */
  TASK_CREATED: "Successful task creation",

  /**
   * Message sent when an existing task is successfully updated.
   * @type {string}
   */
  TASK_UPDATED: "Successful task update",

  /**
   * Message sent when one or more request fields fail express validation rules.
   * @type {string}
   */
  BAD_REQUEST: "Bad request",
};
