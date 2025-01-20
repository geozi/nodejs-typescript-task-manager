/**
 * User service.
 *
 * @module src/service/user
 * @async @function retrieveAllUsers
 * @async @function retrieveUsersByRole
 * @async @function retrieveUserByEmail
 * @async @function retrieveUserByUsername
 * @async @function createUserProfile
 * @async @function updateProfileAsGeneralUser
 * @async @function updateProfileAsAdminUser
 * @async @function deleteUserProfile
 */
import mongoose from "mongoose";
import IUser from "../domain/interfaces/iUser.interface";
import userRepository from "../persistence/user.repository";
import IUserUpdateGeneral from "../presentation/interfaces/iUserUpdateGeneral.interface";
import NotFoundError from "./errors/notFound.error";
import ServerError from "./errors/server.error";
import serviceResponses from "./serviceResources/serviceResponses";
import bcrypt from "bcryptjs";
import IUserUpdateAdmin from "../presentation/interfaces/iUserUpdateAdmin.interface";

/**
 * Calls on the persistence layer to retrieve all users from the 'users' collection.
 *
 * @memberof module:src/service/user
 * @async @function retrieveAllUsers
 * @returns {Promise<Array<IUser>>} A promise that resolves to an array of user objects or an empty array.
 */
const retrieveAllUsers = async (): Promise<Array<IUser>> => {
  try {
    const users = userRepository.getUsers();
    return users;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    throw new ServerError(serviceResponses.SERVER_ERROR);
  }
};

/**
 * Calls on the persistence layer to retrieve all users having the specified role.
 *
 * @memberof module:src/service/user
 * @async @function retrieveUsersByRole
 * @param {string} role The role assigned to each user profile.
 * @returns {Promise<Array<IUser>>} A promise that resolves to an array of user objects or an empty array.
 */
const retrieveUsersByRole = async (role: string): Promise<Array<IUser>> => {
  try {
    const users = await userRepository.getUsersByRole(role);
    if (users.length === 0) {
      throw new NotFoundError(serviceResponses.USERS_NOT_FOUND);
    }
    return users;
  } catch (error) {
    if (error instanceof NotFoundError) {
      throw error;
    }

    throw new ServerError(serviceResponses.SERVER_ERROR);
  }
};

/**
 * Calls on the persistence layer to retrieve the user with the specified username.
 *
 * @memberof module:src/service/user
 * @async @function retrieveUserByUsername
 * @param {string} username The username of the user.
 * @returns {Promise<IUser | null>} A promise that resolves to a user object or null.
 */
const retrieveUserByUsername = async (
  username: string
): Promise<IUser | null> => {
  try {
    const user = await userRepository.getUserByUsername(username);
    if (user === null) {
      throw new NotFoundError(serviceResponses.USER_NOT_FOUND);
    }

    return user;
  } catch (error) {
    if (error instanceof NotFoundError) {
      throw error;
    }

    throw new ServerError(serviceResponses.SERVER_ERROR);
  }
};

/**
 * Calls on the persistence layer to retrieve the user with the specified email.
 *
 * @memberof module:src/service/user
 * @async @function retrieveUserByEmail
 * @param {string} email The email of the user.
 * @returns {Promise<IUser | null>} A promise that resolves to a user object or null.
 */
const retrieveUserByEmail = async (email: string): Promise<IUser | null> => {
  try {
    const user = await userRepository.getUserByEmail(email);
    if (user === null) {
      throw new NotFoundError(serviceResponses.USER_NOT_FOUND);
    }

    return user;
  } catch (error) {
    if (error instanceof NotFoundError) {
      throw error;
    }

    throw new ServerError(serviceResponses.SERVER_ERROR);
  }
};

/**
 * Calls on the persistence layer to add a new user to the database.
 *
 * @memberof module:src/service/user
 * @async @function createUserProfile
 * @param {IUser} newUser A new user object.
 * @returns {Promise<IUser>} A promise that resolves to the saved user object.
 */
const createUserProfile = async (newUser: IUser): Promise<IUser> => {
  try {
    const savedUser = await userRepository.addUser(newUser);
    return savedUser;

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    throw new ServerError(serviceResponses.SERVER_ERROR);
  }
};

/**
 * Calls on the persistence layer to update a user profile (as general).
 *
 * @memberof module:src/service/user
 * @async @function updateProfileAsGeneralUser
 * @description The user using this function must be logged in as a general user.
 * @param {IUserUpdateGeneral} userUpdateInfo A custom type object containing the information to be updated in a user profile.
 * @returns {Promise<IUser | null>} A promise that resolves to the updated user object or null.
 */
const updateProfileAsGeneralUser = async (
  userUpdateInfo: IUserUpdateGeneral
): Promise<IUser | null> => {
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
      throw new NotFoundError(serviceResponses.USER_NOT_FOUND);
    }

    return updatedUserProfile;
  } catch (error) {
    if (error instanceof NotFoundError) {
      throw error;
    }

    throw new ServerError(serviceResponses.SERVER_ERROR);
  }
};

/**
 * Calls on the persistence layer to update a user profile (as admin).
 *
 * @memberof module:src/service/user
 * @async @function updateProfileAsAdminUser
 * @description The user using this function must be logged in as an admin user.
 * @param {IUserUpdateAdmin} userUpdateInfo A custom type object containing the information to be updated in a user profile.
 * @returns {Promise<IUser | null>} A promise that resolves to the updated user object or null.
 */
const updateProfileAsAdminUser = async (
  userUpdateInfo: IUserUpdateAdmin
): Promise<IUser | null> => {
  try {
    const { id, role } = userUpdateInfo;
    const idAsObjectId = new mongoose.Types.ObjectId(id);
    const userToUpdate = {
      role: role,
    };

    const updatedUserProfile = await userRepository.updateUserInfo(
      idAsObjectId,
      userToUpdate
    );

    if (updatedUserProfile === null) {
      throw new NotFoundError(serviceResponses.USER_NOT_FOUND);
    }

    return updatedUserProfile;
  } catch (error) {
    if (error instanceof NotFoundError) {
      throw error;
    }

    throw new ServerError(serviceResponses.SERVER_ERROR);
  }
};

/**
 * Calls on the persistence layer to delete a user profile.
 *
 * @memberof  module:src/service/user
 * @async @function deleteUserProfile
 * @param {string} id The id of the user profile.
 * @returns {Promise<IUser | null>} A promise that resolves to the deleted user object or null.
 */
const deleteUserProfile = async (id: string): Promise<IUser | null> => {
  try {
    const idAsObjectId = new mongoose.Types.ObjectId(id);
    const deletedUserProfile = await userRepository.deleteUserInfo(
      idAsObjectId
    );

    if (deletedUserProfile === null) {
      throw new NotFoundError(serviceResponses.USER_NOT_FOUND);
    }

    return deletedUserProfile;
  } catch (error) {
    if (error instanceof NotFoundError) {
      throw error;
    }

    throw new ServerError(serviceResponses.USER_NOT_FOUND);
  }
};

export default {
  retrieveAllUsers,
  retrieveUsersByRole,
  retrieveUserByUsername,
  retrieveUserByEmail,
  createUserProfile,
  updateProfileAsGeneralUser,
  updateProfileAsAdminUser,
  deleteUserProfile,
};
