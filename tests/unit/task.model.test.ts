/**
 * Task model unit tests.
 */
import Task from "../../src/domain/models/task.model";
import { ITask } from "../../src/domain/interfaces/iTask.interface";
import assert from "assert";
import taskFailedValidation from "../../src/domain/resources/taskValidationMessages";
import testInput from "../testInput";
import sinon from "sinon";
import mongoose from "mongoose";

describe("Task model unit test", () => {
  let newTask: ITask;

  describe("Successful validation", () => {
    beforeEach(() => {
      sinon.restore();
      newTask = new Task(testInput.validTaskInput);
    });

    it("has valid inputs", () => {
      sinon.replace(
        Task.prototype,
        "validateSync",
        sinon.stub().returns(undefined)
      );

      const err = newTask.validateSync();

      assert.strictEqual(err, undefined);
    });
  });

  describe("Failed validation", () => {
    let validationError: mongoose.Error.ValidationError;

    beforeEach(() => {
      sinon.restore();
      newTask = new Task();
      validationError = new mongoose.Error.ValidationError();
    });

    it("has a too short subject", () => {
      validationError.errors = {
        subject: new mongoose.Error.ValidatorError({
          message: taskFailedValidation.SUBJECT_MIN_LENGTH,
          path: "subject",
          value: testInput.invalidTaskInputs.TOO_SHORT_SUBJECT,
        }),
      };

      sinon.replace(
        Task.prototype,
        "validateSync",
        sinon.stub().returns(validationError)
      );

      const err = newTask.validateSync();

      assert.notStrictEqual(err, undefined);

      assert.strictEqual(
        err?.errors.subject.message,
        taskFailedValidation.SUBJECT_MIN_LENGTH
      );
    });

    it("has a too long subject", () => {
      validationError.errors = {
        subject: new mongoose.Error.ValidatorError({
          message: taskFailedValidation.SUBJECT_MAX_LENGTH,
          path: "subject",
          value: testInput.invalidTaskInputs.TOO_LONG_SUBJECT,
        }),
      };

      sinon.replace(
        Task.prototype,
        "validateSync",
        sinon.stub().returns(validationError)
      );

      const err = newTask.validateSync();

      assert.notStrictEqual(err, undefined);

      assert.strictEqual(
        err?.errors.subject.message,
        taskFailedValidation.SUBJECT_MAX_LENGTH
      );
    });

    it("has too long description", () => {
      validationError.errors = {
        description: new mongoose.Error.ValidatorError({
          message: taskFailedValidation.DESCRIPTION_MAX_LENGTH,
          path: "description",
          value: testInput.invalidTaskInputs.TOO_LONG_DESCRIPTION,
        }),
      };

      sinon.replace(
        Task.prototype,
        "validateSync",
        sinon.stub().returns(validationError)
      );

      const err = newTask.validateSync();

      assert.notStrictEqual(err, undefined);

      assert.strictEqual(
        err?.errors.description.message,
        taskFailedValidation.DESCRIPTION_MAX_LENGTH
      );
    });

    it("has invalid status", () => {
      validationError.errors = {
        status: new mongoose.Error.ValidatorError({
          message: taskFailedValidation.STATUS_INVALID,
          path: "status",
          value: testInput.invalidTaskInputs.INVALID_STATUS,
        }),
      };

      sinon.replace(
        Task.prototype,
        "validateSync",
        sinon.stub().returns(validationError)
      );

      const err = newTask.validateSync();

      assert.notStrictEqual(err, undefined);

      assert.strictEqual(
        err?.errors.status.message,
        taskFailedValidation.STATUS_INVALID
      );
    });
  });
});
