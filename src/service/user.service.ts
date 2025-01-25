/**
 * User service.
 *
 * @module src/service/user.service
 * @async @function retrieveUserByEmail
 * @async @function retrieveUserByUsername
 * @async @function createUserProfile
 * @async @function updateUserProfile
 */
import mongoose from "mongoose";
import IUser from "../domain/interfaces/iUser.interface";
import userRepository from "../persistence/user.repository";
import NotFoundError from "./errors/notFound.error";
import ServerError from "./errors/server.error";
import userServiceResponses from "./resources/userService.response";
import commonServiceResponses from "./resources/commonService.response";
import bcrypt from "bcryptjs";
import IUserUpdate from "../presentation/interfaces/iUserUpdate.interface";

/**
 * Calls on the persistence layer to retrieve the user with the specified username.
 *
 * @memberof module:src/service/user.service
 * @async @function retrieveUserByUsername
 * @param {string} username The username of the user.
 * @returns {Promise<IUser>} A promise that resolves to a user object.
 * @throws {NotFoundError | ServerError}
 */
const retrieveUserByUsername = async (username: string): Promise<IUser> => {
  try {
    const user = await userRepository.getUserByUsername(username);
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
 * @memberof module:src/service/user.service
 * @async @function retrieveUserByEmail
 * @param {string} email The email of the user.
 * @returns {Promise<IUser>} A promise that resolves to a user object.
 * @throws {NotFoundError | ServerError}
 */
const retrieveUserByEmail = async (email: string): Promise<IUser> => {
  try {
    const user = await userRepository.getUserByEmail(email);
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
 * @memberof module:src/service/user.service
 * @async @function createUserProfile
 * @param {IUser} newUser The new user profile to be created.
 * @returns {Promise<IUser>} A promise that resolves to the newly saved user object.
 * @throws {ServerError}
 */
const createUserProfile = async (newUser: IUser): Promise<IUser> => {
  try {
    return await userRepository.addUser(newUser);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error: unknown) {
    throw new ServerError(commonServiceResponses.SERVER_ERROR);
  }
};

/**
 * Calls on the persistence layer to update a user profile.
 *
 * @memberof module:src/service/user.service
 * @async @function updateUserProfile
 * @param {IUserUpdate} userUpdateInfo A custom type object containing the information to be updated in a user profile.
 * @returns {Promise<IUser>} A promise that resolves to the updated user object.
 * @throws {NotFoundError | ServerError}
 */
const updateUserProfile = async (
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
    }

    userToUpdate = {
      username: username,
      email: email,
    };

    const updatedUserProfile = await userRepository.updateUserInfo(
      idAsObjectId,
      userToUpdate
    );

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

export default {
  retrieveUserByUsername,
  retrieveUserByEmail,
  createUserProfile,
  updateUserProfile,
};
