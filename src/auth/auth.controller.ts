/**
 * Auth controller.
 * @module src/auth/auth.controller
 */
import * as dotenv from "dotenv";
import { authResponses } from "./authResponseMessages";
import { responseMessages } from "../presentation/resources/responseMessages";
import bcrypt from "bcryptjs";
import {
  userLoginRules,
  headerValidationRules,
} from "../auth/authRules.validation";
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { validationResult } from "express-validator";
import { ServerError } from "../persistence/errors/server.error";
import { commonServiceResponses } from "../service/resources/commonService.response";
import { IToken } from "./interfaces/iToken.interface";
import { userServiceResponses } from "../service/resources/userService.response";
import { retrieveUserByUsername } from "../service/user.service";
import { NotFoundError } from "../service/errors/notFound.error";
import { httpCodes } from "../presentation/resources/responseStatusCodes";
dotenv.config();

/**
 * Middleware array that contains user login logic.
 *
 * @type {Array<Object>}
 * @property {ValidationChain[]} userLoginRules - Express validation rules for user login.
 * @property {Function} anonymousAsyncFunction - Handles user login requests and responses.
 */
export const loginUser = [
  ...userLoginRules(),

  /**
   * Processes HTTP requests for user login.
   *
   * @param {Request} req - An HTTP request.
   * @param {Response} res - An HTTP response.
   * @returns {Promise<void>} A promise that resolves void.
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
      const { username, password } = req.body;
      const user = await retrieveUserByUsername(username);

      const passwordMatch = await bcrypt.compare(password, user.password);

      if (!passwordMatch) {
        res
          .status(httpCodes.UNAUTHORIZED)
          .json({ message: authResponses.AUTHENTICATION_FAILED });
      }

      const token = jwt.sign(
        { username: user.username },
        process.env.KEY as string,
        {
          expiresIn: "1h",
        }
      );

      await res.status(httpCodes.OK).json({ token: token });
    } catch (error: NotFoundError | ServerError | unknown) {
      if (error instanceof NotFoundError) {
        await res
          .status(httpCodes.UNAUTHORIZED)
          .json({ message: userServiceResponses.USER_NOT_FOUND });
        return;
      }

      await res
        .status(ServerError.httpCode)
        .json({ message: commonServiceResponses.SERVER_ERROR });
      return;
    }
  },
];

/**
 * Middleware array that contains token verification logic.
 *
 * @type {Array<Object>}
 * @property {ValidationChain[]} headerValidationRules - Express validation rules for token validation.
 * @property {Function} - Handles token validation processes.
 */
export const verifyToken = [
  ...headerValidationRules(),

  /**
   * Performs token verification.
   *
   * @param {Request} req - An HTTP request.
   * @param {Response} res - An HTTP response.
   * @param {NextFunction} next - A function to move to the next step of the middleware path.
   * @returns {Promise<void>} A promise that resolves to void.
   */
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    req.body.skipAuthenticateToken = true;

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
      const token = req.headers.authorization;

      if (!token) {
        await res
          .status(httpCodes.UNAUTHORIZED)
          .json({ message: authResponses.AUTH_HEADER_REQUIRED });
        return;
      } else {
        const receivedToken = token.replace("Bearer ", "");
        const decoded = jwt.verify(receivedToken, process.env.KEY as string);
        req.body.username = (decoded as IToken).username;
        req.body.skipAuthenticateToken = false;
        next();
      }

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      await res
        .status(httpCodes.FORBIDDEN)
        .json({ message: authResponses.AUTHORIZATION_FAILED });
      return;
    }
  },
];

/**
 * Processes HTTP requests for token authentication.
 *
 * @param {Request} req - An HTTP request.
 * @param {Response} res - An HTTP response.
 * @param {NextFunction} next - A build-in Express function to move further down the routing path.
 * @returns {Promise<void>} A promise that resolves to void.
 */
export const authenticateToken = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  if (req.body.skipAuthenticateToken) {
    return;
  }

  try {
    const username = req.body.username;
    await retrieveUserByUsername(username);
    next();
  } catch (error) {
    if (error instanceof NotFoundError) {
      await res
        .status(httpCodes.UNAUTHORIZED)
        .json({ message: authResponses.AUTHENTICATION_FAILED });
      return;
    }

    if (error instanceof ServerError) {
      await res
        .status(httpCodes.INTERNAL_SERVER_ERROR)
        .json({ message: commonServiceResponses.SERVER_ERROR });
      return;
    }
  }
};
