/**
 * User repository.
 *
 * @module src/persistence/user
 * @async @function getUserByEmail
 * @async @function getUserByUsername
 * @async @function addUser
 * @async @function updateUserInfo
 */
import mongoose from "mongoose";
import User from "../domain/models/user.model";
import IUser from "../domain/interfaces/iUser.interface";

/**
 * Returns the user with the specified username.
 *
 * @memberof module:src/persistence/user
 * @async @function getUserByUsername
 * @param {string} username The username of the user.
 * @returns {Promise<IUser | null>} A promise that resolves to a user object or null.
 */
const getUserByUsername = async (username: string): Promise<IUser | null> => {
  return await User.findOne({ username: username });
};

/**
 * Returns the user with the specified email.
 *
 * @memberof module:src/persistence/user
 * @async @function getUserByEmail
 * @param {string} email  The email of the user.
 * @returns {Promise<IUser | null>} A promise that resolves to a user object or null.
 */
const getUserByEmail = async (email: string): Promise<IUser | null> => {
  return await User.findOne({ email: email });
};

/**
 * Adds a new user to the 'users' collection.
 *
 * @memberof module:src/persistence/user
 * @async @function addUser
 * @param {IUser} newUser The new user to be added.
 * @returns {Promise<IUser>} A promise that resolves to the saved document in the form of a user object.
 */
const addUser = async (newUser: IUser): Promise<IUser> => {
  return await newUser.save();
};

/**
 * Updates the information of a specified user.
 *
 * @memberof module:src/persistence/user
 * @async @function updateUserInfo
 * @param {mongoose.Types.ObjectId} id The id of the user document.
 * @param {Object} updateDataObj The new data to be persisted.
 * @returns {Promise<IUser | null>} A promise that resolves to the user object after update or null.
 */
const updateUserInfo = async (
  id: mongoose.Types.ObjectId,
  updateDataObj: object
): Promise<IUser | null> => {
  return await User.findByIdAndUpdate(id, updateDataObj, {
    new: true,
    runValidators: true,
    context: "query",
  });
};

export default {
  getUserByEmail,
  getUserByUsername,
  addUser,
  updateUserInfo,
};
