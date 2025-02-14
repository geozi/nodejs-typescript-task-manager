/**
 * User controller
 * @module src/presentation/controllers/user.controller
 */
import { validationResult } from "express-validator";
import User from "../../domain/models/user.model";
import { responseMessages } from "../resources/responseMessages";
import {
  userProfileUpdateRules,
  userRegistrationRules,
} from "../middleware/userRules.validation";
import { NotFoundError } from "../../service/errors/notFound.error";
import { ServerError } from "../../persistence/errors/server.error";
import {
  createUserProfile,
  updateUserProfile,
} from "../../service/user.service";
import { Request, Response } from "express";
import { IUserUpdate } from "../interfaces/iUserUpdate.interface";
import { UniqueConstraintError } from "../../domain/errors/uniqueConstraint.error";
import { httpCodes } from "../resources/responseStatusCodes";

/**
 * Middleware array that contains user registration logic.
 *
 * @type {Array<Object>}
 * @property {ValidationChain[]} userRegistrationRules - Express validation rules for user registration.
 * @property {Function} anonymousAsyncFunction - Handles user registration requests and responses.
 */
export const registerUser = [
  ...userRegistrationRules(),

  /**
   * Processes HTTP requests for user registration.
   *
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

      await res
        .status(httpCodes.BAD_REQUEST)
        .json({ message: responseMessages.BAD_REQUEST, errors: errorMessage });
      return;
    }

    try {
      const { username, email, password } = req.body;
      const newUser = new User({
        username: username,
        email: email,
        password: password,
      });

      await createUserProfile(newUser);
      await res
        .status(httpCodes.CREATED)
        .json({ message: responseMessages.USER_REGISTERED });
    } catch (error: ServerError | UniqueConstraintError | unknown) {
      if (error instanceof UniqueConstraintError) {
        await res
          .status(UniqueConstraintError.httpCode)
          .json({ message: error.message });
        return;
      }

      if (error instanceof ServerError) {
        await res.status(ServerError.httpCode).json({ message: error.message });
        return;
      }
    }
  },
];

/**
 * Middleware array that contains user update logic.
 *
 * @type {Array<Object>}
 * @property {ValidationChain[]} userProfileUpdateRules - Express validation rules for user update.
 * @property {Function} anonymousAsyncFunction - Handles user update requests and responses.
 */
export const updateUserInfo = [
  ...userProfileUpdateRules(),

  /**
   * Processes HTTP requests for user update.
   *
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

      await res
        .status(httpCodes.BAD_REQUEST)
        .json({ message: responseMessages.BAD_REQUEST, errors: errorMessage });
      return;
    }

    try {
      const { id, username, email, password } = req.body;
      const userUpdateInfo: IUserUpdate = {
        id: id,
        username: username,
        email: email,
        password: password,
      };
      await updateUserProfile(userUpdateInfo);
      await res
        .status(httpCodes.OK)
        .json({ message: responseMessages.USER_UPDATED });
    } catch (error:
      | NotFoundError
      | ServerError
      | UniqueConstraintError
      | unknown) {
      if (error instanceof UniqueConstraintError) {
        await res
          .status(UniqueConstraintError.httpCode)
          .json({ message: error.message });
        return;
      }

      if (error instanceof NotFoundError) {
        await res
          .status(NotFoundError.httpCode)
          .json({ message: error.message });
        return;
      }

      if (error instanceof ServerError) {
        await res.status(ServerError.httpCode).json({ message: error.message });
        return;
      }
    }
  },
];
