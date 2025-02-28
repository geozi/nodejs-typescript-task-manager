/**
 * Express validation rules for user-related operations.
 * @module src/presentation/middleware/userRules.validation
 */

import { check, ValidationChain } from "express-validator";
import userFailedValidation from "../../domain/resources/userValidationMessages";
import regularExpressions from "../../domain/resources/validationRegExp";

/**
 * Returns a validation chain for user registration.
 * @returns {ValidationChain[]} Validation chain.
 */
export const userRegistrationRules = (): ValidationChain[] => {
  return [
    check("username")
      .notEmpty()
      .withMessage(userFailedValidation.USERNAME_REQUIRED)
      .isLength({ min: 3 })
      .withMessage(userFailedValidation.USERNAME_MIN_LENGTH)
      .isLength({ max: 20 })
      .withMessage(userFailedValidation.USERNAME_MAX_LENGTH),
    check("email")
      .notEmpty()
      .withMessage(userFailedValidation.EMAIL_REQUIRED)
      .matches(regularExpressions.EMAIL_REGEX)
      .withMessage(userFailedValidation.EMAIL_INVALID),
    check("password")
      .notEmpty()
      .withMessage(userFailedValidation.PASSWORD_REQUIRED)
      .isLength({ min: 7 })
      .withMessage(userFailedValidation.PASSWORD_MIN_LENGTH)
      .matches(regularExpressions.PASSWORD_REGEX)
      .withMessage(userFailedValidation.PASSWORD_MUST_HAVE_CHARACTERS),
  ];
};

/**
 * Returns a validation chain for user profile update.
 * @returns {ValidationChain[]} Validation chain.
 */
export const userProfileUpdateRules = (): ValidationChain[] => {
  return [
    check("id")
      .notEmpty()
      .withMessage(userFailedValidation.USER_ID_REQUIRED)
      .matches(regularExpressions.ID_REGEX)
      .withMessage(userFailedValidation.USER_ID_INVALID)
      .isLength({ min: 24, max: 24 })
      .withMessage(userFailedValidation.USER_ID_LENGTH),
    check("username")
      .optional()
      .isLength({ min: 3 })
      .withMessage(userFailedValidation.USERNAME_MIN_LENGTH)
      .isLength({ max: 20 })
      .withMessage(userFailedValidation.USERNAME_MAX_LENGTH),
    check("email")
      .optional()
      .matches(regularExpressions.EMAIL_REGEX)
      .withMessage(userFailedValidation.EMAIL_INVALID),
    check("password")
      .optional()
      .isLength({ min: 7 })
      .withMessage(userFailedValidation.PASSWORD_MIN_LENGTH)
      .matches(regularExpressions.PASSWORD_REGEX)
      .withMessage(userFailedValidation.PASSWORD_MUST_HAVE_CHARACTERS),
  ];
};

/**
 * Returns a validation chain for email-based user retrieval.
 * @returns {ValidationChain[]} Validation chain.
 */
export const userRetrievalByEmailRules = (): ValidationChain[] => {
  return [
    check("email")
      .notEmpty()
      .withMessage(userFailedValidation.EMAIL_REQUIRED)
      .matches(regularExpressions.EMAIL_REGEX)
      .withMessage(userFailedValidation.EMAIL_INVALID),
  ];
};

/**
 * Returns a validation chain for username-based user retrieval.
 * @returns {ValidationChain[]} Validation chain.
 */
export const userRetrievalByUsernameRules = (): ValidationChain[] => {
  return [
    check("username")
      .notEmpty()
      .withMessage(userFailedValidation.USERNAME_REQUIRED)
      .isLength({ min: 3 })
      .withMessage(userFailedValidation.USERNAME_MIN_LENGTH)
      .isLength({ max: 20 })
      .withMessage(userFailedValidation.USERNAME_MAX_LENGTH),
  ];
};
