/**
 * User repository.
 *
 * @module src/persistence/user
 * @async @function getUsers
 * @async @function getUsersByRole
 * @async @function getUserByEmail
 * @async @function getUserByUsername
 * @async @function addUser
 * @async @function updateUserInfo
 * @async @function deleteUserInfo
 */
import mongoose from "mongoose";
import User from "../domain/models/user.model";
import IUser from "../domain/interfaces/iUser.interface";

/**
 * Returns all users persisted in the 'users' collection.
 *
 * @memberof module:src/persistence/user
 * @async @function getUsers
 * @returns {Promise<Array<IUser>>} A promise that resolves to an array of user objects or an empty array.
 */
const getUsers = async (): Promise<Array<IUser>> => {
  return await User.find({});
};

/**
 * Returns all users having the specified role.
 *
 * @memberof module:src/persistence/user
 * @async @function getUsersByRole
 * @param {string} role The role designated to a user profile.
 * @returns {Promise<Array<IUser>>} A promise that resolves to an array of user objects or an empty array.
 */
const getUsersByRole = async (role: string): Promise<Array<IUser>> => {
  return await User.find({ role: role });
};

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

/**
 * Deletes the information of a specified user.
 *
 * @memberof module:src/persistence/user
 * @async @function deleteUserInfo
 * @param {mongoose.Types.ObjectId} id The id of the user document.
 * @returns {Promise<IUser | null>} A promise that resolves to the deleted document in the form of a user object or null.
 */
const deleteUserInfo = async (
  id: mongoose.Types.ObjectId
): Promise<IUser | null> => {
  return await User.findByIdAndDelete(id);
};

export default {
  getUsers,
  getUsersByRole,
  getUserByEmail,
  getUserByUsername,
  addUser,
  updateUserInfo,
  deleteUserInfo,
};
