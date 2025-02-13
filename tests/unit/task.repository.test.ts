/**
 * Task repository unit tests.
 */
import testInput from "../testInput";
import assert from "assert";
import sinon from "sinon";
import Task from "../../src/domain/models/task.model";
import { ITask } from "../../src/domain/interfaces/iTask.interface";
import {
  addTask,
  deleteTask,
  getTaskBySubject,
  getTasksByStatus,
  getTasksByUsername,
  updateTask,
} from "../../src/persistence/task.repository";
import { Types } from "mongoose";

describe("Task repository unit tests", () => {
  let newTask: ITask;
  const mockTask = new Task();
  const mockTasks = [new Task(), new Task()];
  const mockId = new Types.ObjectId("67adcdfd4265b2332f658fc3");

  describe("getTasksByStatus()", () => {
    beforeEach(() => {
      sinon.restore();
    });

    it("Promise resolves to Task object array", async () => {
      sinon.stub(Task, "find").resolves(mockTasks);
      const foundTasks = await getTasksByStatus(
        testInput.validTaskInput.status
      );

      assert(foundTasks instanceof Array);
      assert.strictEqual(foundTasks.length, 2);
    });

    it("Promise resolves to empty array", async () => {
      sinon.stub(Task, "find").resolves([]);
      const foundTasks = await getTasksByStatus(
        testInput.validTaskInput.status
      );

      assert(foundTasks instanceof Array);
      assert.strictEqual(foundTasks.length, 0);
    });
  });

  describe("getTasksByUsername()", () => {
    beforeEach(() => {
      sinon.restore();
    });

    it("Promise resolves to Task object array", async () => {
      sinon.stub(Task, "find").resolves(mockTasks);
      const foundTasks = await getTasksByUsername(
        testInput.validTaskInput.username
      );

      assert(foundTasks instanceof Array);
      assert.strictEqual(foundTasks.length, 2);
    });

    it("Promise resolves to empty array", async () => {
      sinon.stub(Task, "find").resolves([]);
      const foundTasks = await getTasksByUsername(
        testInput.validTaskInput.username
      );

      assert(foundTasks instanceof Array);
      assert.strictEqual(foundTasks.length, 0);
    });
  });

  describe("getTasksBySubject()", () => {
    beforeEach(() => {
      sinon.restore();
    });

    it("Promise resolves to Task object", async () => {
      sinon.stub(Task, "findOne").resolves(mockTask);
      const foundTask = await getTaskBySubject(
        testInput.validTaskInput.subject
      );
      assert(foundTask instanceof Task);
    });

    it("Promise resolves to null", async () => {
      sinon.stub(Task, "findOne").resolves(null);
      const foundTask = await getTaskBySubject(
        testInput.validTaskInput.subject
      );
      assert.strictEqual(foundTask, null);
    });
  });

  describe("addTask()", () => {
    beforeEach(() => {
      sinon.restore();
      newTask = new Task();
    });

    it("Promise resolves to Task object", async () => {
      sinon.stub(Task.prototype, "save").resolves(mockTask);
      const savedTask = await addTask(newTask);

      assert(savedTask instanceof Task);
    });
  });

  describe("updateTask()", () => {
    beforeEach(() => {
      sinon.restore();
    });

    it("Promise resolves to Task object", async () => {
      sinon.stub(Task, "findByIdAndUpdate").resolves(mockTask);
      const updatedTask = await updateTask(mockId, testInput.validTaskInput);

      assert(updatedTask instanceof Task);
    });

    it("Promise resolves to null", async () => {
      sinon.stub(Task, "findByIdAndUpdate").resolves(null);
      const updatedTask = await updateTask(mockId, testInput.validTaskInput);

      assert.strictEqual(updatedTask, null);
    });
  });

  describe("deleteTask()", () => {
    beforeEach(() => {
      sinon.restore();
    });

    it("Promise resolves to Task object", async () => {
      sinon.stub(Task, "findByIdAndDelete").resolves(mockTask);
      const deletedTask = await deleteTask(mockId);

      assert(deletedTask instanceof Task);
    });

    it("Promise resolves to null", async () => {
      sinon.stub(Task, "findByIdAndDelete").resolves(null);
      const deletedTask = await deleteTask(mockId);

      assert.strictEqual(deletedTask, null);
    });
  });
});
