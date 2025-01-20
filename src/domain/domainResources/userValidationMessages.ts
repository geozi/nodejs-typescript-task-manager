/**
 * User validation error messages.
 * @module src/domainResources/userValidationMessages
 */

/**
 * Contains response messages triggered when user validation fails.
 *
 * @memberof module:src/domainResources/userValidationMessages
 * @type {Object}
 * @property {string} USERNAME_REQUIRED - Message sent when no username is provided.
 * @property {string} USERNAME_MAX_LENGTH - Message sent when the provided username is too long.
 * @property {string} USERNAME_MIN_LENGTH - Message sent when the provided username is too short.
 * @property {string} EMAIL_REQUIRED - Message sent when no email is provided.
 * @property {string} EMAIL_INVALID - Message sent when the provided email is not a valid email address.
 * @property {string} PASSWORD_REQUIRED - Message sent when no password is provided.
 * @property {string} PASSWORD_MIN_LENGTH - Message sent when the provided password is too short.
 * @property {string} PASSWORD_MUST_HAVE_CHARACTERS - Message sent when the provided password is invalid.
 * @property {string} ROLE_REQUIRED - Message sent when no role is provided.
 * @property {string} ROLE_INVALID - Message sent when the provided role does not much the standard categories.
 */
const userFailedValidation = {
  /**
   * Message sent when no username is provided..
   * @type {string}
   */
  USERNAME_REQUIRED: "Username is a required field",

  /**
   * Message sent when the provided username is too long.
   * @type {string}
   */
  USERNAME_MAX_LENGTH: "Username must be no longer than 20 characters",

  /**
   * Message sent when the provided username is too short.
   * @type {string}
   */
  USERNAME_MIN_LENGTH: "Username must be at least 3 characters long",

  /**
   * Message sent when no email is provided.
   * @type {string}
   */
  EMAIL_REQUIRED: "Email is a required field",

  /**
   * Message sent when the provided email is not a valid email address.
   * @type {string}
   */
  EMAIL_INVALID: "Invalid email address",

  /**
   * Message sent when no password is provided.
   * @type {string}
   */
  PASSWORD_REQUIRED: "Password is a required field",

  /**
   * Message sent when the provided password is too short.
   * @type {string}
   */
  PASSWORD_MIN_LENGTH: "Password must be at least 7 characters long",

  /**
   * Message sent when the provided password is invalid.
   * @type {string}
   */
  PASSWORD_MUST_HAVE_CHARACTERS: `
  **Password must contain at one of the following:
  - **one lowercase character**,
  - **one uppercase character**,
  - **one number**,
  - **one special symbol**
  `,

  /**
   * Message sent when no role is provided.
   * @type {string}
   */
  ROLE_REQUIRED: "Role is a required field",

  /**
   * Message sent when the provided role does not much the standard categories.
   * @type {string}
   */
  ROLE_INVALID: `
  **The role must be one of the following categories:**
  - **Admin**,
  - **General**
  `,
};

export default userFailedValidation;
