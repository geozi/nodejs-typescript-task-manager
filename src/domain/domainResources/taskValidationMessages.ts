/**
 * Task validation error messages.
 * @module src/domainResources/taskValidationMessages
 */

/**
 * Contains response messages triggered when task validation fails.
 *
 * @memberof module:src/domainResources/taskValidationMessages
 * @type {Object}
 * @property {string} SUBJECT_REQUIRED - Message sent when no subject is provided.
 * @property {string} SUBJECT_MAX_LENGTH - Message sent when the provided subject is too long.
 * @property {string} SUBJECT_MIN_LENGTH - Message sent when the provided subject is too short.
 * @property {string} DESCRIPTION_MAX_LENGTH - Message sent when the provided description is too long.
 * @property {string} STATUS_REQUIRED - Message sent when no status is provided.
 * @property {string} STATUS_INVALID - Message sent when the provided status does not match the standard categories.
 * @property {string} TASK_ID_REQUIRED - Message sent when the task ID is not provided.
 * @property {string} TASK_ID_INVALID - Message sent when the task ID does not match the standard regex pattern.
 * @property {string} TASK_ID_LENGTH - Message sent when the task ID's length is not 24 characters long.
 */
const taskFailedValidation = {
  /**
   * Message sent when no subject is provided.
   * @memberof taskFailedValidation
   * @type {string}
   */
  SUBJECT_REQUIRED: "Subject is a required field",

  /**
   * Message sent when the provided subject is too long.
   * @memberof taskFailedValidation
   * @type {string}
   */
  SUBJECT_MAX_LENGTH: "Subject must be no longer than 100 characters",

  /**
   * Message sent when the provided subject is too short.
   * @memberof taskFailedValidation
   * @type {string}
   */
  SUBJECT_MIN_LENGTH: "Subject must be at least 10 characters long",

  /**
   * Message sent when the provided description is too long.
   * @memberof taskFailedValidation
   * @type {string}
   */
  DESCRIPTION_MAX_LENGTH: "Description must be no longer than 300 characters",

  /**
   * Message sent when no status is provided.
   * @memberof taskFailedValidation
   * @type {string}
   */
  STATUS_REQUIRED: "Status is a required field",

  /**
   * Message sent when the provided status does not match the standard categories.
   * @memberof taskFailedValidation
   * @type {string}
   */
  STATUS_INVALID: `
  **Status must be one of the following categories**:
  - **Pending**,
  - **Complete**
  `,

  /**
   * Message sent when the task ID is not provided.
   * @memberof taskFailedValidation
   * @type {string}
   */
  TASK_ID_REQUIRED: "Task ID is a required field",

  /**
   * Message sent when the task ID does not match the standard regex pattern.
   * @memberof taskFailedValidation
   * @type {string}
   */
  TASK_ID_INVALID: "Task ID must only contain alphanumeric characters",

  /**
   * Message sent when the task ID's length is not 24 characters long.
   * @memberof taskFailedValidation
   * @type {string}
   */
  TASK_ID_LENGTH: "Task ID must be 24 characters long",
};

export default taskFailedValidation;
