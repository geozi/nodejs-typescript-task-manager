/**
 * Task model unit tests.
 */
import Task from "../../src/domain/models/task.model";
import ITask from "../../src/domain/interfaces/iTask.interface";
import assert from "assert";
import taskFailedValidation from "../../src/domain/resources/taskValidationMessages";
import testInput from "../testInput";

describe("Task model unit test", () => {
  let newTask: ITask;

  beforeEach(() => {
    newTask = new Task(testInput.validTaskInput);
  });

  it("has valid inputs", () => {
    const err = newTask.validateSync();

    assert.strictEqual(err, undefined);
  });

  it("has a too short subject", () => {
    newTask.subject = testInput.invalidTaskInputs.TOO_SHORT_SUBJECT;
    const err = newTask.validateSync();

    assert.strictEqual(
      err?.errors.subject.message,
      taskFailedValidation.SUBJECT_MIN_LENGTH
    );
  });

  it("has a too long subject", () => {
    newTask.subject = testInput.invalidTaskInputs.TOO_LONG_SUBJECT;
    const err = newTask.validateSync();

    assert.strictEqual(
      err?.errors.subject.message,
      taskFailedValidation.SUBJECT_MAX_LENGTH
    );
  });

  it("has too long description", () => {
    newTask.description = testInput.invalidTaskInputs.TOO_LONG_DESCRIPTION;
    const err = newTask.validateSync();

    assert.strictEqual(
      err?.errors.description.message,
      taskFailedValidation.DESCRIPTION_MAX_LENGTH
    );
  });

  it("has invalid status", () => {
    newTask.status = testInput.invalidTaskInputs.INVALID_STATUS;
    const err = newTask.validateSync();

    assert.strictEqual(
      err?.errors.status.message,
      taskFailedValidation.STATUS_INVALID
    );
  });
});
