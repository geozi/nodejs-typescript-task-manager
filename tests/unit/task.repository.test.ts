/**
 * Task repository unit tests.
 */
import mongoose from "mongoose";
import testInput from "../testInput";
import assert from "assert";
import sinon from "sinon";
import Task from "../../src/domain/models/task.model";
import { ITask } from "../../src/domain/interfaces/iTask.interface";
import { addTask } from "../../src/persistence/task.repository";

describe("Task repository unit test", () => {
  let newTask: ITask;

  describe("addTask() test(s)", () => {
    describe("Promise<ITask> resolves", () => {
      beforeEach(() => {
        sinon.stub(Task.prototype, "save").resolves({});
      });

      afterEach(() => {
        sinon.restore();
      });

      it("task added", () => {
        newTask = new Task(testInput.validTaskInput);
        assert.doesNotReject(async () => {
          await addTask(newTask);
        });
      });
    });

    describe("Promise<ITask> rejects", () => {
      beforeEach(() => {
        sinon
          .stub(Task.prototype, "save")
          .rejects(new mongoose.Error.ValidationError());
      });

      afterEach(() => {
        sinon.restore();
      });

      it("has too short subject", () => {
        newTask = new Task(testInput.validTaskInput);
        newTask.subject = testInput.invalidTaskInputs.TOO_SHORT_SUBJECT;

        assert.rejects(async () => {
          await addTask(newTask);
        }, mongoose.Error.ValidationError);
      });

      it("has too long subject", () => {
        newTask = new Task(testInput.validTaskInput);
        newTask.subject = testInput.invalidTaskInputs.TOO_LONG_SUBJECT;

        assert.rejects(async () => {
          await addTask(newTask);
        }, mongoose.Error.ValidationError);
      });

      it("has too long description", () => {
        newTask = new Task(testInput.validTaskInput);
        newTask.description = testInput.invalidTaskInputs.TOO_LONG_DESCRIPTION;

        assert.rejects(async () => {
          await addTask(newTask);
        }, mongoose.Error.ValidationError);
      });

      it("has invalid status", () => {
        newTask = new Task(testInput.validTaskInput);
        newTask.status = testInput.invalidTaskInputs.INVALID_STATUS;

        assert.rejects(async () => {
          await addTask(newTask);
        }, mongoose.Error.ValidationError);
      });
    });
  });
});
