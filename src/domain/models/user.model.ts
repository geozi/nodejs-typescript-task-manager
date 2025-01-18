/**
 * User schema.
 * @module src/models/user
 */
import { Schema, model } from "mongoose";
import IUser from "../interfaces/iUser.interface";
import mongooseUniqueValidator from "mongoose-unique-validator";
import userFailedValidation from "../../resources/userValidationMessages";
import Role from "../enums/role.enum";
import regularExpressions from "../../resources/validationRegExp";

/**
 * User schema for persistence in MongoDB.
 *
 * @memberof module:src/models/user
 * @type {Schema<IUser>}
 * @property {string} username - The username of the user.
 * @property {string} email - The email of the user.
 * @property {string} password - The password of the user.
 * @property {string} role - The role of the user.
 */
const userSchema = new Schema<IUser>(
  {
    username: {
      type: String,
      unique: true,
      required: [true, userFailedValidation.USERNAME_REQUIRED],
      maxLength: [20, userFailedValidation.USERNAME_MAX_LENGTH],
      minLength: [3, userFailedValidation.USERNAME_MIN_LENGTH],
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      required: [true, userFailedValidation.EMAIL_REQUIRED],
      match: [regularExpressions.ID_REGEX, userFailedValidation.EMAIL_INVALID],
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, userFailedValidation.PASSWORD_REQUIRED],
      match: [
        regularExpressions.PASSWORD_REGEX,
        userFailedValidation.PASSWORD_MUST_HAVE_CHARACTERS,
      ],
      minLength: [7, userFailedValidation.PASSWORD_MIN_LENGTH],
      trim: true,
    },
    role: {
      type: String,
      enum: {
        values: Object.values(Role),
        message: userFailedValidation.ROLE_INVALID,
      },
      required: [true, userFailedValidation.ROLE_REQUIRED],
    },
  },
  {
    collection: "users",
    timestamps: true,
  }
);

userSchema.plugin(mongooseUniqueValidator, "{PATH} already exists.");
export default model<IUser>("User", userSchema);
