/**
 * User controller
 * @module src/presentation/controllers/user
 */

import validator from "express-validator";
import User from "../../domain/models/user.model";
import responseMessages from "../resources/responseMessages";
import userValidationRules from "../middleware/userRules.validation";
import NotFoundError from "../../service/errors/notFound.error";
import ServerError from "../../service/errors/server.error";
import userService from "../../service/user.service";
import { Request, Response } from "express";

const registerUser = [
  ...userValidationRules.userRegistrationRules(),
  async (req: Request, res: Response) => {
    const expressErrors = validator.validationResult(req);
    if (!expressErrors.isEmpty()) {
      const errorMessage = expressErrors.array().map((err) => ({
        message: err.msg,
      }));

      return res
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
      return res
        .status(201)
        .json({ message: responseMessages.USER_REGISTERED });
    } catch (error) {
      if (error instanceof NotFoundError) {
        return res
          .status(NotFoundError.httpCode)
          .json({ message: error.message });
      }

      if (error instanceof ServerError) {
        return res
          .status(ServerError.httpCode)
          .json({ message: error.message });
      }
    }
  },
];

export default registerUser;
