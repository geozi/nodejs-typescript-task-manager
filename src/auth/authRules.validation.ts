/**
 * Validation rules for authentication requests.
 * @module src/auth/authRules
 */
import { check, header, ValidationChain } from "express-validator";
import regularExpressions from "../domain/resources/validationRegExp";
import { authResponses } from "./authResponseMessages";
import userFailedValidation from "../domain/resources/userValidationMessages";

/**
 * Returns a validation chain for user login.
 * @returns {ValidationChain[]} Validation chain.
 */
export const userLoginRules = (): ValidationChain[] => {
  return [
    check("username")
      .notEmpty()
      .withMessage(userFailedValidation.USERNAME_REQUIRED)
      .isLength({ min: 3 })
      .withMessage(userFailedValidation.USERNAME_MIN_LENGTH)
      .isLength({ max: 20 })
      .withMessage(userFailedValidation.USERNAME_MAX_LENGTH),
    check("password")
      .notEmpty()
      .withMessage(userFailedValidation.PASSWORD_REQUIRED)
      .isLength({ min: 7 })
      .withMessage(userFailedValidation.PASSWORD_MIN_LENGTH)
      .matches(regularExpressions.PASSWORD_REGEX)
      .withMessage(userFailedValidation.PASSWORD_MUST_HAVE_CHARACTERS),
  ];
};

/** Returns a validation chain for header validation.
 * @returns {ValidationChain[]} - Validation chain.
 */
export const headerValidationRules = (): ValidationChain[] => {
  return [
    header("Authorization")
      .notEmpty()
      .withMessage(authResponses.AUTH_HEADER_REQUIRED),
  ];
};
