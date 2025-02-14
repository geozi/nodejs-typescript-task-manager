/**
 * Task fetching by subject integration tests.
 */
import sinon, { SinonSpy, SinonStub } from "sinon";
import testInput from "../testInput";
import assert from "assert";
import { Request, Response } from "express";
import { retrieveTaskBySubject } from "../../src/service/task.service";
import { taskServiceResponses } from "../../src/service/resources/taskService.response";
import { commonServiceResponses } from "../../src/service/resources/commonService.response";
import { fetchTaskBySubject } from "../../src/presentation/controllers/task.controller";
import { responseMessages } from "../../src/presentation/resources/responseMessages";
import * as taskRepository from "../../src/persistence/task.repository";
import taskFailedValidation from "../../src/domain/resources/taskValidationMessages";
import { httpCodes } from "../../src/presentation/resources/responseStatusCodes";

describe("Subject-based task fetching integration tests", () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: SinonSpy;

  describe("validation-oriented", () => {
    describe("bad requests (400)", () => {
      beforeEach(() => {
        sinon.replace(
          { retrieveTaskBySubject },
          "retrieveTaskBySubject",
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

      it("subject is missing", async () => {
        req = { body: { subject: undefined } };

        for (const middleware of fetchTaskBySubject) {
          await middleware(req as Request, res as Response, next);
        }

        const statusStub = res.status as SinonStub;
        const jsonSpy = res.json as SinonSpy;

        assert.strictEqual(statusStub.calledWith(httpCodes.BAD_REQUEST), true);
        assert.strictEqual(
          jsonSpy.calledWith({
            message: responseMessages.BAD_REQUEST,
            errors: [
              { message: taskFailedValidation.SUBJECT_REQUIRED },
              { message: taskFailedValidation.SUBJECT_MIN_LENGTH },
            ],
          }),
          true
        );
      });

      it("subject is too short", async () => {
        req = {
          body: { subject: testInput.invalidTaskInputs.TOO_SHORT_SUBJECT },
        };

        for (const middleware of fetchTaskBySubject) {
          await middleware(req as Request, res as Response, next);
        }

        const statusStub = res.status as SinonStub;
        const jsonSpy = res.json as SinonSpy;

        assert.strictEqual(statusStub.calledWith(httpCodes.BAD_REQUEST), true);
        assert.strictEqual(
          jsonSpy.calledWith({
            message: responseMessages.BAD_REQUEST,
            errors: [{ message: taskFailedValidation.SUBJECT_MIN_LENGTH }],
          }),
          true
        );
      });

      it("subject is too long", async () => {
        req = {
          body: { subject: testInput.invalidTaskInputs.TOO_LONG_SUBJECT },
        };

        for (const middleware of fetchTaskBySubject) {
          await middleware(req as Request, res as Response, next);
        }

        const statusStub = res.status as SinonStub;
        const jsonSpy = res.json as SinonSpy;

        assert.strictEqual(statusStub.calledWith(httpCodes.BAD_REQUEST), true);
        assert.strictEqual(
          jsonSpy.calledWith({
            message: responseMessages.BAD_REQUEST,
            errors: [{ message: taskFailedValidation.SUBJECT_MAX_LENGTH }],
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
      methodStub = sinon.stub(taskRepository, "getTaskBySubject");
    });

    afterEach(() => {
      sinon.restore();
    });

    it("server error (500)", async () => {
      req = { body: { subject: testInput.validTaskInput.subject } };

      methodStub.rejects();
      for (const middleware of fetchTaskBySubject) {
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
      req = { body: { subject: testInput.validTaskInput.subject } };

      methodStub.resolves(null);
      for (const middleware of fetchTaskBySubject) {
        await middleware(req as Request, res as Response, next);
      }

      const statusStub = res.status as SinonStub;
      const jsonSpy = res.json as SinonSpy;

      assert.strictEqual(statusStub.calledWith(httpCodes.NOT_FOUND), true);
      assert.strictEqual(
        jsonSpy.calledWith({ message: taskServiceResponses.TASK_NOT_FOUND }),
        true
      );
    });
  });
});
