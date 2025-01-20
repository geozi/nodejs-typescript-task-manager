/**
 * Task schema.
 * @module src/models/task
 */
import { Schema, model } from "mongoose";
import ITask from "../interfaces/iTask.interface";
import mongooseUniqueValidator from "mongoose-unique-validator";
import taskFailedValidation from "../domainResources/taskValidationMessages";
import Status from "../enums/status.enum";
import userFailedValidation from "../domainResources/userValidationMessages";

/**
 * Task schema for persistence in MongoDB.
 *
 * @memberof module:src/models/task
 * @type {Schema<ITask>}
 * @property {string} subject - The subject of the task.
 * @property {string} description - The description of the task.
 * @property {string} status - The status of the task.
 * @property {string} username - The username of the task.
 */
const taskSchema = new Schema<ITask>(
  {
    subject: {
      type: String,
      unique: true,
      required: [true, taskFailedValidation.SUBJECT_REQUIRED],
      minLength: [10, taskFailedValidation.SUBJECT_MIN_LENGTH],
      maxLength: [100, taskFailedValidation.SUBJECT_MAX_LENGTH],
      trim: true,
    },
    description: {
      type: String,
      maxLength: [300, taskFailedValidation.DESCRIPTION_MAX_LENGTH],
      trim: true,
    },
    status: {
      type: String,
      required: [true, taskFailedValidation.STATUS_REQUIRED],
      enum: {
        values: Object.values(Status),
        message: taskFailedValidation.STATUS_INVALID,
      },
    },
    username: {
      type: String,
      required: [true, userFailedValidation.USERNAME_REQUIRED],
    },
  },
  {
    collection: "tasks",
    timestamps: true,
  }
);

taskSchema.plugin(mongooseUniqueValidator, "{PATH} already exists.");
export default model<ITask>("Task", taskSchema);
