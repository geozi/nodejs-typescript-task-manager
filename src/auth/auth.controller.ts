/**
 * Auth controller.
 * @module src/auth/auth.controller
 */
import * as dotenv from "dotenv";
import authResponses from "./authResponseMessages";
import responseMessages from "../presentation/resources/responseMessages";
import bcrypt from "bcryptjs";
import authRules from "../auth/authRules.validation";
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { validationResult } from "express-validator";
import User from "../domain/models/user.model";
import ServerError from "../service/errors/server.error";
import commonService from "../../src/service/serviceResources/commonService.response";
import authRulesValidation from "../auth/authRules.validation";
import IToken from "./interfaces/iToken.interface";
dotenv.config();

/**
 * Middleware array that contains user login logic.
 *
 * @memberof src/auth/auth.controller
 * @type {Array<Object>}
 * @property {ValidationChain[]} userLoginRules - Express validation rules for user login.
 * @property {Function} anonymousAsyncFunction - Handles user login requests and responses.
 */
const loginUser = [
  ...authRules.userLoginRules(),

  /**
   * Processes HTTP requests for user login.
   *
   * @memberof loginUser
   * @async @function anonymousAsyncFunction
   * @param {Request} req - An HTTP request.
   * @param {Response} res - An HTTP response.
   * @returns {Promise<Response>} A promise that resolves to a response object.
   */
  async (req: Request, res: Response): Promise<Response> => {
    const expressErrors = validationResult(req);
    if (!expressErrors.isEmpty()) {
      const errorMessage = expressErrors.array().map((err) => ({
        message: err.msg,
      }));

      return res
        .status(400)
        .json({ message: responseMessages.BAD_REQUEST, errors: errorMessage });
    }

    try {
      const { username, password } = req.body;
      const user = await User.findOne({ username: username });

      if (user === null) {
        return res.status(401).json({ message: authResponses.AUTH_FAILED });
      }

      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return res.status(401).json({ message: authResponses.AUTH_FAILED });
      }

      const token = jwt.sign(
        { username: user.username },
        process.env.KEY as string,
        {
          expiresIn: "1h",
        }
      );

      return res.status(200).json({ token: token });
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error: ServerError | unknown) {
      return res
        .status(ServerError.httpCode)
        .json({ message: commonService.SERVER_ERROR });
    }
  },
];

/**
 * Middleware array that contains token validation logic.
 *
 * @memberof module:src/auth/auth.controller
 * @type {Array<Object>}
 * @property {ValidationChain[]} headerValidationRules - Express validation rules for token validation.
 * @property {Function} - Handles token validation processes.
 */
const verifyToken = [
  ...authRulesValidation.headerValidationRules(),

  /**
   * Performs token validation.
   *
   * @memberof verifyToken
   * @async @function anonymousAsyncFunction
   * @param {Request} req - An HTTP request.
   * @param {Response} res - An HTTP response.
   * @param {NextFunction} next - A function to move to the next step of the middleware path.
   * @returns {Promise<void | Response>} A promise that resolves to a response object or void.
   */
  async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void | Response> => {
    const expressErrors = validationResult(req);
    if (!expressErrors.isEmpty()) {
      const errorMessage = expressErrors.array().map((err) => ({
        message: err.msg,
      }));

      return res
        .status(400)
        .json({ message: responseMessages.BAD_REQUEST, errors: errorMessage });
    }

    try {
      const token = req.headers.authorization;

      if (!token) {
        return res
          .status(401)
          .json({ message: authResponses.AUTH_HEADER_REQUIRED });
      }

      const decoded = jwt.verify(
        token.replace("Bearer ", ""),
        process.env.KEY as string
      );
      req.body.username = (decoded as IToken).username;
      next();
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      return res.status(401).json({ message: authResponses.AUTH_FAILED });
    }
  },
];

export default { loginUser, verifyToken };
