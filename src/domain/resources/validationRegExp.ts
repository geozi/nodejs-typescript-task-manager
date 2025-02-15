/**
 * Regular expressions.
 * @module src/resources/validationRegExp
 */

/**
 * Contains regular expressions used in validation processes.
 *
 * @type {Object}
 * @property {RegExp} EMAIL_REGEX - Regular expression used in checking email validity.
 * @property {RegExp} ID_REGEX - Regular expression used in checking id validity.
 * @property {RegExp} PASSWORD_REGEX - Regular expression used in checking password validity.
 */
const regularExpressions = {
  /**
   * Regular expression used in checking email validity.
   * @type {RegExp}
   */
  EMAIL_REGEX: new RegExp(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/),

  /**
   * Regular expression used in checking id validity.
   * @type {RegExp}
   */
  ID_REGEX: new RegExp(/^[0-9a-f]{1,}$/),

  /**
   * Regular expression used in checking password validity.
   * @type {RegExp}
   */
  PASSWORD_REGEX: new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/),
};

export default regularExpressions;
