/**
 * Express validation rules for task-related operations.
 * @module src/presentation/middleware/taskRules.validation
 */

import { check, ValidationChain } from "express-validator";
import taskFailedValidation from "../../domain/domainResources/taskValidationMessages";
import Status from "../../domain/enums/status.enum";
import regularExpressions from "../../domain/domainResources/validationRegExp";
import userFailedValidation from "../../domain/domainResources/userValidationMessages";

/**
 * Returns a validation chain for task creation.
 *
 * @memberof module:src/presentation/middleware/taskRules.validation
 * @function taskCreationRules
 * @returns {ValidationChain[]} Validation chain.
 */
const taskCreationRules = (): ValidationChain[] => {
  return [
    check("subject")
      .notEmpty()
      .withMessage(taskFailedValidation.SUBJECT_REQUIRED)
      .isLength({ min: 10 })
      .withMessage(taskFailedValidation.SUBJECT_MIN_LENGTH)
      .isLength({ max: 100 })
      .withMessage(taskFailedValidation.SUBJECT_MAX_LENGTH),
    check("description")
      .optional()
      .isLength({ max: 300 })
      .withMessage(taskFailedValidation.DESCRIPTION_MAX_LENGTH),
    check("status")
      .notEmpty()
      .withMessage(taskFailedValidation.STATUS_REQUIRED)
      .isIn([Status.Pending, Status.Complete])
      .withMessage(taskFailedValidation.STATUS_INVALID),
  ];
};

/**
 * Returns a validation chain for task update.
 * @memberof module:src/presentation/middleware/taskRules.validation
 * @function taskUpdateRules
 * @returns {ValidationChain[]} Validation chain.
 */
const taskUpdateRules = (): ValidationChain[] => {
  console.log("I am inside task update rules");
  return [
    check("id")
      .notEmpty()
      .withMessage(taskFailedValidation.TASK_ID_REQUIRED)
      .matches(regularExpressions.ID_REGEX)
      .withMessage(taskFailedValidation.TASK_ID_INVALID)
      .isLength({ min: 24, max: 24 })
      .withMessage(taskFailedValidation.TASK_ID_LENGTH),
    check("subject")
      .optional()
      .isLength({ min: 10 })
      .withMessage(taskFailedValidation.SUBJECT_MIN_LENGTH)
      .isLength({ max: 100 })
      .withMessage(taskFailedValidation.SUBJECT_MAX_LENGTH),
    check("description")
      .optional()
      .isLength({ max: 300 })
      .withMessage(taskFailedValidation.DESCRIPTION_MAX_LENGTH),
    check("status")
      .optional()
      .isIn([Status.Pending, Status.Complete])
      .withMessage(taskFailedValidation.STATUS_INVALID),
  ];
};

/**
 * Returns a validation chain for task deletion.
 * @memberof module:src/presentation/middleware/taskRules.validation
 * @function taskDeletionRules
 * @returns {ValidationChain[]} Validation chain.
 */
const taskDeletionRules = (): ValidationChain[] => {
  return [
    check("id")
      .notEmpty()
      .withMessage(taskFailedValidation.TASK_ID_REQUIRED)
      .matches(regularExpressions.ID_REGEX)
      .withMessage(taskFailedValidation.TASK_ID_INVALID)
      .isLength({ min: 24, max: 24 })
      .withMessage(taskFailedValidation.TASK_ID_LENGTH),
  ];
};

/**
 * Returns a validation chain for username-based task fetching.
 * @memberof module:src/presentation/middleware/taskRules.validation
 * @function taskFetchingByUsernameRules
 * @returns {ValidationChain[]} Validation chain.
 */
const taskFetchingByUsernameRules = (): ValidationChain[] => {
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

/**
 * Returns a validation chain for subject-based task fetching.
 * @memberof module:src/presentation/middleware/taskRules.validation
 * @function taskFetchingBySubjectRules
 * @returns {ValidationChain[]} Validation chain.
 */
const taskFetchingBySubjectRules = (): ValidationChain[] => {
  return [
    check("subject")
      .notEmpty()
      .withMessage(taskFailedValidation.SUBJECT_REQUIRED)
      .isLength({ min: 10 })
      .withMessage(taskFailedValidation.SUBJECT_MIN_LENGTH)
      .isLength({ max: 100 })
      .withMessage(taskFailedValidation.SUBJECT_MAX_LENGTH),
  ];
};

/**
 * Returns a validation chain for status-based task fetching.
 * @memberof module:src/presentation/middleware/taskRules.validation
 * @function taskFetchingBySubjectRules
 * @returns {ValidationChain[]} Validation chain.
 */
const taskFetchingByStatusRules = (): ValidationChain[] => {
  return [
    check("status")
      .notEmpty()
      .withMessage(taskFailedValidation.STATUS_REQUIRED)
      .isIn([Status.Pending, Status.Complete])
      .withMessage(taskFailedValidation.STATUS_INVALID),
  ];
};

export default {
  taskCreationRules,
  taskUpdateRules,
  taskDeletionRules,
  taskFetchingByUsernameRules,
  taskFetchingBySubjectRules,
  taskFetchingByStatusRules,
};
