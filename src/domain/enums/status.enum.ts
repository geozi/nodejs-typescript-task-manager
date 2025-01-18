/**
 * Status enum.
 * @module src/domain/enums/status
 */

/**
 * Enum for status categories.
 *
 * @memberof module:src/domain/enums/status
 * @readonly
 * @enum {string}
 */
enum Status {
  /**
   * Represents the 'Pending' status category.
   * @type {string}
   */
  Pending = "Pending",

  /**
   * Represents the 'Complete' status category.
   * @type {string}
   */
  Complete = "Complete",
}

export default Status;
