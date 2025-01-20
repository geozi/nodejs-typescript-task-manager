/**
 * Regular expressions.
 * @module src/domainResources/validationRegExp
 */

/**
 * Contains regular expressions used in validation processes.
 *
 * @memberof module:src/domainResources/validationRegExp
 * @type {Object}
 * @property {RegExp} EMAIL_REGEX Regular expression used in checking email validity.
 * @property {RegExp} ID_REGEX Regular expression used in checking id validity.
 * @property {RegExp} PASSWORD_REGEX Regular expression used in checking password validity.
 */
const regularExpressions = {
  /**
   * Regular expression used in checking email validity.
   * @memberof module:src/domainResources/validationRegExp
   * @type {RegExp}
   */
  EMAIL_REGEX: new RegExp(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/),

  /**
   * Regular expression used in checking id validity.
   * @memberof module:src/domainResources/validationRegExp
   * @type {RegExp}
   */
  ID_REGEX: new RegExp(/^[0-9a-f]{1,}$/),

  /**
   * Regular expression used in checking password validity.
   * @memberof module:src/domainResources/validationRegExp
   * @type {RegExp}
   */
  PASSWORD_REGEX: new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/),
};

export default regularExpressions;
