/**
 * Task service unit tests.
 */
import Task from "../../src/domain/models/task.model";
import { ITask } from "../../src/domain/interfaces/iTask.interface";
import { ITaskUpdate } from "../../src/presentation/interfaces/iTaskUpdate.interface";
import assert from "assert";
import testInput from "../testInput";
import sinon from "sinon";
import {
  retrieveTaskBySubject,
  retrieveTasksByStatus,
  retrieveTasksByUsername,
  createTaskRecord,
  updateTaskRecord,
  deleteTaskRecord,
} from "../../src/service/task.service";
import * as taskRepository from "../../src/persistence/task.repository";
import { NotFoundError } from "../../src/service/errors/notFound.error";
import { ServerError } from "../../src/persistence/errors/server.error";

describe("Task service unit test", () => {
  const validTask = new Task(testInput.validTaskInput);
  const mockTasks: ITask[] = [];
  const mockTask = new Task();
  const mockUpdateDataObj: ITaskUpdate = {
    id: "678f6f5feeb9f5507709b24e",
  };
  const mockId = "678f7e88196eec7b9d3d549a";
  let methodStub: sinon.SinonStub;

  describe("Promise rejects", () => {
    describe("retrieveTasksByStatus()", () => {
      beforeEach(() => {
        methodStub = sinon.stub(taskRepository, "getTasksByStatus");
      });

      afterEach(() => {
        methodStub.restore();
      });

      it("server error", async () => {
        methodStub.rejects();
        await assert.rejects(async () => {
          await retrieveTasksByStatus(validTask.status);
        }, ServerError);
      });

      it("tasks not found", async () => {
        methodStub.resolves(mockTasks);
        await assert.rejects(async () => {
          await retrieveTasksByStatus(validTask.status);
        }, NotFoundError);
      });
    });

    describe("retrieveTasksByUsername()", () => {
      beforeEach(() => {
        methodStub = sinon.stub(taskRepository, "getTasksByUsername");
      });

      afterEach(() => {
        methodStub.restore();
      });

      it("server error", async () => {
        methodStub.rejects();
        await assert.rejects(async () => {
          await retrieveTasksByUsername(validTask.username);
        }, ServerError);
      });

      it("tasks not found", async () => {
        methodStub.resolves(mockTasks);
        await assert.rejects(async () => {
          await retrieveTasksByUsername(validTask.username);
        }, NotFoundError);
      });
    });

    describe("retrieveTaskBySubject()", () => {
      beforeEach(() => {
        methodStub = sinon.stub(taskRepository, "getTaskBySubject");
      });

      afterEach(() => {
        methodStub.restore();
      });

      it("server error", async () => {
        methodStub.rejects();
        await assert.rejects(async () => {
          await retrieveTaskBySubject(validTask.subject);
        });
      });

      it("task not found", async () => {
        methodStub.resolves(null);
        await assert.rejects(async () => {
          await retrieveTaskBySubject(validTask.subject);
        }, NotFoundError);
      });
    });

    describe("createTaskRecord()", () => {
      it("server error", async () => {
        sinon.stub(taskRepository, "addTask").rejects();
        await assert.rejects(async () => {
          await createTaskRecord(mockTask);
        }, ServerError);
      });
    });

    describe("updateTaskRecord()", () => {
      beforeEach(() => {
        methodStub = sinon.stub(taskRepository, "updateTask");
      });

      afterEach(() => {
        methodStub.restore();
      });

      it("server error", async () => {
        methodStub.rejects();
        await assert.rejects(async () => {
          await updateTaskRecord(mockUpdateDataObj);
        }, ServerError);
      });

      it("task not found()", async () => {
        methodStub.resolves(null);
        await assert.rejects(async () => {
          await updateTaskRecord(mockUpdateDataObj);
        }, NotFoundError);
      });
    });
  });

  describe("deleteTaskRecord()", () => {
    beforeEach(() => {
      methodStub = sinon.stub(taskRepository, "deleteTask");
    });

    afterEach(() => {
      methodStub.restore();
    });

    it("server error", async () => {
      methodStub.rejects();
      await assert.rejects(async () => {
        await deleteTaskRecord(mockId);
      }, ServerError);
    });

    it("task not found", async () => {
      methodStub.resolves(null);
      await assert.rejects(async () => {
        await deleteTaskRecord(mockId);
      }, NotFoundError);
    });
  });
});
