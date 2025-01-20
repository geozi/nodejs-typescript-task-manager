/**
 * Role enum.
 * @module src/domain/enums/role
 */

/**
 * Enum for user roles.
 *
 * @memberof module:src/domain/enums/role
 * @readonly
 * @enum {string}
 */
enum Role {
  /**
   * Represents the 'admin' role.
   * @memberof module:src/domain/enums/role
   * @type {string}
   */
  Admin = "Admin",

  /**
   * Represents the 'general' role.
   * @memberof module:src/domain/enums/role
   * @type {string}
   */
  General = "General",
}

export default Role;
