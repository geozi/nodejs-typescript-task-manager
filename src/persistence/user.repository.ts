/**
 * User repository.
 * @module src/persistence/user.repository
 */

import User from "../domain/models/user.model";
import { IUser } from "../domain/interfaces/iUser.interface";
import { IUserUpdate } from "../presentation/interfaces/iUserUpdate.interface";

/**
 * Returns the user with the specified username.
 *
 * @param {string} username The username of the user.
 * @returns {Promise<IUser | null>} A promise that resolves to a user object or null.
 */
export const getUserByUsername = async (
  username: string
): Promise<IUser | null> => {
  return await User.findOne({ username: username });
};

/**
 * Returns the user with the specified email.
 *
 * @param {string} email  The email of the user.
 * @returns {Promise<IUser | null>} A promise that resolves to a user object or null.
 */
export const getUserByEmail = async (email: string): Promise<IUser | null> => {
  return await User.findOne({ email: email });
};

/**
 * Adds a new user to the 'users' collection.
 *
 * @param {IUser} newUser The new user to be added.
 * @returns {Promise<IUser>} A promise that resolves to the saved document in the form of a user object.
 */
export const addUser = async (newUser: IUser): Promise<IUser> => {
  return await newUser.save();
};

/**
 * Updates the information of a specified user.
 *
 * @param {IUserUpdate} updateDataObj The new data to be persisted.
 * @returns {Promise<IUser | null>} A promise that resolves to the user object after update or null.
 */
export const updateUserInfo = async (
  updateDataObj: IUserUpdate
): Promise<IUser | null> => {
  return await User.findByIdAndUpdate(
    updateDataObj.id,
    {
      username: updateDataObj.username,
      email: updateDataObj.email,
      password: updateDataObj.password,
    },
    {
      new: true,
      runValidators: true,
      context: "query",
    }
  );
};
