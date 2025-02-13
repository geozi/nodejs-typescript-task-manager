/**
 * User service.
 * @module src/service/user.service
 */
import mongoose, { Error } from "mongoose";
import { IUser } from "../domain/interfaces/iUser.interface";
import {
  getUserByEmail,
  getUserByUsername,
  addUser,
  updateUserInfo,
} from "../persistence/user.repository";
import { NotFoundError } from "./errors/notFound.error";
import { ServerError } from "../persistence/errors/server.error";
import { userServiceResponses } from "./resources/userService.response";
import { commonServiceResponses } from "./resources/commonService.response";
import bcrypt from "bcryptjs";
import { IUserUpdate } from "../presentation/interfaces/iUserUpdate.interface";
import { UniqueConstraintError } from "../domain/errors/uniqueConstraint.error";

/**
 * Calls on the persistence layer to retrieve the user with the specified username.
 *
 * @param {string} username The username of the user.
 * @returns {Promise<IUser>} A promise that resolves to a user object.
 * @throws {NotFoundError | ServerError}
 */
export const retrieveUserByUsername = async (
  username: string
): Promise<IUser> => {
  try {
    const user = await getUserByUsername(username);
    if (user === null) {
      throw new NotFoundError(userServiceResponses.USER_NOT_FOUND);
    }

    return user;
  } catch (error) {
    if (error instanceof NotFoundError) {
      throw error;
    }

    throw new ServerError(commonServiceResponses.SERVER_ERROR);
  }
};

/**
 * Calls on the persistence layer to retrieve the user with the specified email.
 *
 * @param {string} email The email of the user.
 * @returns {Promise<IUser>} A promise that resolves to a user object.
 * @throws {NotFoundError | ServerError}
 */
export const retrieveUserByEmail = async (email: string): Promise<IUser> => {
  try {
    const user = await getUserByEmail(email);
    if (user === null) {
      throw new NotFoundError(userServiceResponses.USER_NOT_FOUND);
    }

    return user;
  } catch (error) {
    if (error instanceof NotFoundError) {
      throw error;
    }

    throw new ServerError(commonServiceResponses.SERVER_ERROR);
  }
};

/**
 * Calls on the persistence layer to add a new user to the database.
 *
 * @param {IUser} newUser The new user profile to be created.
 * @returns {Promise<IUser>} A promise that resolves to the newly saved user object.
 * @throws {UniqueConstraintError | ServerError}
 */
export const createUserProfile = async (newUser: IUser): Promise<IUser> => {
  try {
    const hashedPassword = await bcrypt.hash(newUser.password, 10);
    newUser.password = hashedPassword;
    return await addUser(newUser);
  } catch (error: UniqueConstraintError | ServerError | unknown) {
    if (error instanceof Error.ValidationError) {
      throw new UniqueConstraintError(error.message);
    }

    throw new ServerError(commonServiceResponses.SERVER_ERROR);
  }
};

/**
 * Calls on the persistence layer to update a user profile.
 *
 * @param {IUserUpdate} userUpdateInfo A custom type object containing the information to be updated in a user profile.
 * @returns {Promise<IUser>} A promise that resolves to the updated user object.
 * @throws {NotFoundError | ServerError}
 */
export const updateUserProfile = async (
  userUpdateInfo: IUserUpdate
): Promise<IUser> => {
  try {
    const { id, username, email, password } = userUpdateInfo;
    const idAsObjectId = new mongoose.Types.ObjectId(id);

    let userToUpdate = {};
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      userToUpdate = {
        username: username,
        email: email,
        password: hashedPassword,
      };
    } else {
      userToUpdate = {
        username: username,
        email: email,
      };
    }

    const updatedUserProfile = await updateUserInfo(idAsObjectId, userToUpdate);

    if (updatedUserProfile === null) {
      throw new NotFoundError(userServiceResponses.USER_NOT_FOUND);
    }

    return updatedUserProfile;
  } catch (error) {
    if (error instanceof NotFoundError) {
      throw error;
    }

    throw new ServerError(commonServiceResponses.SERVER_ERROR);
  }
};
