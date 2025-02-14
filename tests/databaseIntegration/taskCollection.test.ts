/**
 * Task collection database integration tests.
 */
import {
  createTask,
  updateTask,
  deleteTask,
} from "../../src/presentation/controllers/task.controller";
import { addTask } from "../../src/persistence/task.repository";
import Task from "../../src/domain/models/task.model";
import mongoose, { ConnectOptions } from "mongoose";
import { responseMessages } from "../../src/presentation/resources/responseMessages";
import * as dotenv from "dotenv";
import sinon, { SinonStub, SinonSpy } from "sinon";
import { Request, Response } from "express";
import testInput from "../testInput";
import assert from "assert";
import { httpCodes } from "../../src/presentation/resources/responseStatusCodes";
dotenv.config();

describe("Task collection database integration tests", () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: SinonSpy;

  before(async () => {
    await mongoose.connect(
      process.env.MONGODB_URI as string,
      { useNewUrlParser: true } as ConnectOptions
    );
  });

  after(async () => {
    await mongoose.connection.close();
  });

  beforeEach(() => {
    res = {
      status: sinon.stub().callsFake(() => {
        return res;
      }) as unknown as SinonStub,
      json: sinon.spy(),
    };

    next = sinon.spy();
  });

  afterEach(async () => {
    await Task.deleteMany({});
    sinon.restore();
  });

  it("new task created (201)", async () => {
    req = { body: testInput.validTaskInput };

    for (const middleware of createTask) {
      await middleware(req as Request, res as Response, next);
    }

    const statusStub = res.status as SinonStub;
    const jsonSpy = res.json as SinonSpy;

    assert.strictEqual(statusStub.calledWith(httpCodes.CREATED), true);
    assert.strictEqual(
      jsonSpy.calledWith({ message: responseMessages.TASK_CREATED }),
      true
    );
  });

  it("task updated (200)", async () => {
    const task = new Task(testInput.validTaskInput);
    const savedTask = await addTask(task);

    req = {
      body: { id: savedTask._id, email: "updated@mail.com" },
    };

    for (const middleware of updateTask) {
      await middleware(req as Request, res as Response, next);
    }

    const statusStub = res.status as SinonStub;
    const jsonSpy = res.json as SinonSpy;

    assert.strictEqual(statusStub.calledWith(httpCodes.OK), true);
    assert.strictEqual(
      jsonSpy.calledWith({ message: responseMessages.TASK_UPDATED }),
      true
    );
  });

  it("task deleted (204)", async () => {
    const task = new Task(testInput.validTaskInput);
    const savedTask = await addTask(task);

    req = { body: { id: savedTask._id } };

    for (const middleware of deleteTask) {
      await middleware(req as Request, res as Response, next);
    }

    const statusStub = res.status as SinonStub;

    assert.strictEqual(statusStub.calledWith(httpCodes.NO_CONTENT), true);
  });
});
