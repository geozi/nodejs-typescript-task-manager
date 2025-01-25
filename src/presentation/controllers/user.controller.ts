/**
 * User controller
 * @module src/presentation/controllers/user.controller
 */

import { validationResult } from "express-validator";
import User from "../../domain/models/user.model";
import responseMessages from "../resources/responseMessages";
import userValidationRules from "../middleware/userRules.validation";
import NotFoundError from "../../service/errors/notFound.error";
import ServerError from "../../service/errors/server.error";
import userService from "../../service/user.service";
import { Request, Response } from "express";
import IUserUpdate from "../interfaces/iUserUpdate.interface";

/**
 * Middleware array that contains user registration logic.
 *
 * @memberof module:src/presentation/controllers/user.controller
 * @type {Array<Object>}
 * @property {ValidationChain[]} userRegistrationRules - Express validation rules for user registration.
 * @property {Function} anonymousAsyncFunction - Handles user registration requests and responses.
 */
const registerUser = [
  ...userValidationRules.userRegistrationRules(),

  /**
   * Processes HTTP requests for user registration.
   *
   * @memberof registerUser
   * @async @function anonymousAsyncFunction
   * @param {Request} req - An HTTP request.
   * @param {Response} res - An HTTP response.
   * @returns {Promise<void>} A promise that resolves to void.
   */
  async (req: Request, res: Response): Promise<void> => {
    const expressErrors = validationResult(req);
    if (!expressErrors.isEmpty()) {
      const errorMessage = expressErrors.array().map((err) => ({
        message: err.msg,
      }));

      res
        .status(400)
        .json({ message: responseMessages.BAD_REQUEST, errors: errorMessage });
    }

    try {
      const { username, email, password } = req.body;
      const newUser = new User({
        username: username,
        email: email,
        password: password,
      });

      await userService.createUserProfile(newUser);
      res.status(201).json({ message: responseMessages.USER_REGISTERED });
    } catch (error: ServerError | unknown) {
      let serverErrorMessage;
      if (error instanceof ServerError) {
        serverErrorMessage = error.message;
      }

      res.status(ServerError.httpCode).json({ message: serverErrorMessage });
    }
  },
];

/**
 * Middleware array that contains user update logic.
 *
 * @memberof module:src/presentation/controllers/user.controller
 * @type {Array<Object>}
 * @property {ValidationChain[]} userProfileUpdateRules - Express validation rules for user update.
 * @property {Function} anonymousAsyncFunction - Handles user update requests and responses.
 */
const updateUserInfo = [
  ...userValidationRules.userProfileUpdateRules(),

  /**
   * Processes HTTP requests for user update.
   *
   * @memberof updateUser
   * @async @function anonymousAsyncFunction
   * @param {Request} req - An HTTP request.
   * @param {Response} res - An HTTP response.
   * @returns {Promise<void>} - A promise that resolves to void.
   */
  async (req: Request, res: Response): Promise<void> => {
    const expressErrors = validationResult(req);
    if (!expressErrors.isEmpty()) {
      const errorMessage = expressErrors.array().map((err) => ({
        message: err.msg,
      }));

      res
        .status(400)
        .json({ message: responseMessages.BAD_REQUEST, errors: errorMessage });
    }

    try {
      const { id, username, email, password } = req.body;
      const userUpdateInfo: IUserUpdate = {
        id: id,
        username: username,
        email: email,
        password: password,
      };
      await userService.updateUserProfile(userUpdateInfo);
      res.status(200).json({ message: responseMessages.USER_UPDATED });
    } catch (error: NotFoundError | ServerError | unknown) {
      if (error instanceof NotFoundError) {
        res.status(NotFoundError.httpCode).json({ message: error.message });
      }

      let message;
      if (error instanceof ServerError) {
        message = error.message;
      }

      res.status(ServerError.httpCode).json({ message: message });
    }
  },
];

export default { registerUser, updateUserInfo };
