/**
 * Task validation error messages.
 * @module src/resources/taskValidationMessages
 */

/**
 * Contains response messages triggered when task validation fails.
 *
 * @memberof module:src/resources/taskValidationMessages
 * @type {Object}
 * @property {string} SUBJECT_REQUIRED - Message sent when no subject is provided.
 * @property {string} SUBJECT_MAX_LENGTH - Message sent when the provided subject is too long.
 * @property {string} SUBJECT_MIN_LENGTH - Message sent when the provided subject is too short.
 * @property {string} DESCRIPTION_MAX_LENGTH - Message sent when the provided description is too long.
 * @property {string} STATUS_REQUIRED - Message sent when no status is provided.
 * @property {string} STATUS_INVALID - Message sent when the provided status does not match the standard categories.
 */
const taskFailedValidation = {
  /**
   * Message sent when no subject is provided.
   * @type {string}
   */
  SUBJECT_REQUIRED: "Subject is a required field",

  /**
   * Message sent when the provided subject is too long.
   * @type {string}
   */
  SUBJECT_MAX_LENGTH: "Subject must be no longer than 100 characters",

  /**
   * Message sent when the provided subject is too short.
   * @type {string}
   */
  SUBJECT_MIN_LENGTH: "Subject must be at least 10 characters long",

  /**
   * Message sent when the provided description is too long.
   * @type {string}
   */
  DESCRIPTION_MAX_LENGTH: "Description must be no longer than 300 characters",

  /**
   * Message sent when no status is provided.
   * @type {string}
   */
  STATUS_REQUIRED: "Status is a required field",

  /**
   * Message sent when the provided status does not match the standard categories.
   * @type {string}
   */
  STATUS_INVALID: `
  **Status must be one of the following categories**:
  - **Pending**,
  - **Complete**
  `,
};

export default taskFailedValidation;
