/**
 * Role enum.
 * @module src/domain/enums/role.enum
 */

/**
 * Enum for user roles.
 *
 * @memberof module:src/domain/enums/role.enum
 * @readonly
 * @enum {string}
 */
enum Role {
  /**
   * Represents the 'admin' role.
   * @memberof Role
   * @type {string}
   */
  Admin = "Admin",

  /**
   * Represents the 'general' role.
   * @memberof Role
   * @type {string}
   */
  General = "General",
}

export default Role;
