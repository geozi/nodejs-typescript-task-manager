/**
 * Express validation rules for user-related operations.
 * @module src/presentation/middleware/userRules
 */

import { check } from "express-validator";

const userRegistrationRules = () => {
  return [
    check("username").notEmpty().withMessage(""),
    check("email").notEmpty().withMessage(""),
    check("password").notEmpty().withMessage(""),
    check("role").notEmpty().withMessage(""),
  ];
};

const userUpdateRules = () => {};

const userDeletionRules = () => {};

const userRetrievalByEmailRules = () => {};

const userRetrievalByUsernameRules = () => {};

export default {
  userRegistrationRules,
  userUpdateRules,
  userDeletionRules,
  userRetrievalByEmailRules,
  userRetrievalByUsernameRules,
};
