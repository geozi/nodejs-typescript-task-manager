/**
 * Task service unit tests.
 */
import Task from "../../src/domain/models/task.model";
import { ITask } from "../../src/domain/interfaces/iTask.interface";
import { ITaskUpdate } from "../../src/presentation/interfaces/iTaskUpdate.interface";
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
import * as chai from "chai";
import chaiAsPromised from "chai-as-promised";
chai.use(chaiAsPromised);

describe("Task service unit tests", () => {
  const mockUpdateDataObj: ITaskUpdate = {
    id: "678f6f5feeb9f5507709b24e",
  };
  const mockId = "678f7e88196eec7b9d3d549a";
  let methodStub: sinon.SinonStub;

  describe("retrieveTasksByStatus()", () => {
    beforeEach(() => {
      methodStub = sinon.stub(taskRepository, "getTasksByStatus");
    });

    afterEach(() => {
      methodStub.restore();
    });

    it("server error", async () => {
      methodStub.rejects();

      await chai
        .expect(retrieveTasksByStatus(testInput.validTaskInput.status))
        .to.be.rejectedWith(ServerError);
    });

    it("tasks not found", async () => {
      methodStub.resolves([]);

      await chai
        .expect(retrieveTasksByStatus(testInput.validTaskInput.status))
        .to.be.rejectedWith(NotFoundError);
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

      await chai
        .expect(retrieveTasksByUsername(testInput.validTaskInput.username))
        .to.be.rejectedWith(ServerError);
    });

    it("tasks not found", async () => {
      methodStub.resolves([]);

      await chai
        .expect(retrieveTasksByUsername(testInput.validTaskInput.username))
        .to.be.rejectedWith(NotFoundError);
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

      await chai
        .expect(retrieveTaskBySubject(testInput.validTaskInput.subject))
        .to.be.rejectedWith(ServerError);
    });

    it("task not found", async () => {
      methodStub.resolves(null);

      await chai
        .expect(retrieveTaskBySubject(testInput.validTaskInput.subject))
        .to.be.rejectedWith(NotFoundError);
    });
  });

  describe("createTaskRecord()", () => {
    let newTask: ITask;
    beforeEach(() => {
      methodStub = sinon.stub(taskRepository, "addTask");
      newTask = new Task();
    });

    afterEach(() => {
      methodStub.restore();
    });

    it("server error", async () => {
      methodStub.rejects();

      await chai
        .expect(createTaskRecord(newTask))
        .to.be.rejectedWith(ServerError);
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

      await chai
        .expect(updateTaskRecord(mockUpdateDataObj))
        .to.be.rejectedWith(ServerError);
    });

    it("not found", async () => {
      methodStub.resolves(null);

      await chai
        .expect(updateTaskRecord(mockUpdateDataObj))
        .to.be.rejectedWith(NotFoundError);
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

      await chai
        .expect(deleteTaskRecord(mockId))
        .to.be.rejectedWith(ServerError);
    });

    it("not found", async () => {
      methodStub.resolves(null);

      await chai
        .expect(deleteTaskRecord(mockId))
        .to.be.rejectedWith(NotFoundError);
    });
  });
});
