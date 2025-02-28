/**
 * Task fetching by status integration tests.
 */
import sinon, { SinonSpy, SinonStub } from "sinon";
import testInput from "../testInput";
import assert from "assert";
import { Request, Response } from "express";
import { retrieveTasksByStatus } from "../../src/service/task.service";
import { taskServiceResponses } from "../../src/service/resources/taskService.response";
import { commonServiceResponses } from "../../src/service/resources/commonService.response";
import { fetchTasksByStatus } from "../../src/presentation/controllers/task.controller";
import { responseMessages } from "../../src/presentation/resources/responseMessages";
import * as taskRepository from "../../src/persistence/task.repository";
import { ITask } from "../../src/domain/interfaces/iTask.interface";
import taskFailedValidation from "../../src/domain/resources/taskValidationMessages";
import { httpCodes } from "../../src/presentation/resources/responseStatusCodes";

describe("Status-based task fetching integration tests", () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: SinonSpy;

  describe("validation-oriented", () => {
    describe("bad requests (400)", () => {
      beforeEach(() => {
        sinon.replace(
          { retrieveTasksByStatus },
          "retrieveTasksByStatus",
          sinon.fake()
        );
        res = {
          status: sinon.stub().callsFake(() => {
            return res;
          }) as unknown as SinonStub,
          json: sinon.spy(),
        };

        next = sinon.spy();
      });

      afterEach(() => {
        sinon.restore();
      });

      it("status is missing", async () => {
        req = { body: { status: undefined } };

        for (const middleware of fetchTasksByStatus) {
          await middleware(req as Request, res as Response, next);
        }

        const statusStub = res.status as SinonStub;
        const jsonSpy = res.json as SinonSpy;

        assert.strictEqual(statusStub.calledWith(httpCodes.BAD_REQUEST), true);
        assert.strictEqual(
          jsonSpy.calledWith({
            message: responseMessages.BAD_REQUEST,
            errors: [
              { message: taskFailedValidation.STATUS_REQUIRED },
              { message: taskFailedValidation.STATUS_INVALID },
            ],
          }),
          true
        );
      });

      it("status is invalid", async () => {
        req = { body: { status: testInput.invalidTaskInputs.INVALID_STATUS } };

        for (const middleware of fetchTasksByStatus) {
          await middleware(req as Request, res as Response, next);
        }

        const statusStub = res.status as SinonStub;
        const jsonSpy = res.json as SinonSpy;

        assert.strictEqual(statusStub.calledWith(httpCodes.BAD_REQUEST), true);
        assert.strictEqual(
          jsonSpy.calledWith({
            message: responseMessages.BAD_REQUEST,
            errors: [{ message: taskFailedValidation.STATUS_INVALID }],
          }),
          true
        );
      });
    });
  });

  describe("promise-oriented", () => {
    let methodStub: SinonStub;

    beforeEach(() => {
      res = {
        status: sinon.stub().callsFake(() => {
          return res;
        }) as unknown as SinonStub,
        json: sinon.spy(),
      };

      next = sinon.spy();
      methodStub = sinon.stub(taskRepository, "getTasksByStatus");
    });

    afterEach(() => {
      sinon.restore();
    });

    it("server error (500)", async () => {
      req = { body: { status: testInput.validTaskInput.status } };

      methodStub.rejects();
      for (const middleware of fetchTasksByStatus) {
        await middleware(req as Request, res as Response, next);
      }

      const statusStub = res.status as SinonStub;
      const jsonSpy = res.json as SinonSpy;

      assert.strictEqual(
        statusStub.calledWith(httpCodes.INTERNAL_SERVER_ERROR),
        true
      );
      assert.strictEqual(
        jsonSpy.calledWith({ message: commonServiceResponses.SERVER_ERROR }),
        true
      );
    });

    it("not found (404)", async () => {
      req = { body: { status: testInput.validTaskInput.status } };
      const mockTasks: ITask[] = [];

      methodStub.resolves(mockTasks);
      for (const middleware of fetchTasksByStatus) {
        await middleware(req as Request, res as Response, next);
      }

      const statusStub = res.status as SinonStub;
      const jsonSpy = res.json as SinonSpy;

      assert.strictEqual(statusStub.calledWith(httpCodes.NOT_FOUND), true);
      assert.strictEqual(
        jsonSpy.calledWith({ message: taskServiceResponses.TASKS_NOT_FOUND }),
        true
      );
    });
  });
});
