/**
 * Task deletion integration tests.
 */
import sinon, { SinonSpy, SinonStub } from "sinon";
import testInput from "../testInput";
import assert from "assert";
import { Request, Response } from "express";
import taskService from "../../src/service/task.service";
import taskServiceResponses from "../../src/service/serviceResources/taskService.response";
import commonService from "../../src/service/serviceResources/commonService.response";
import taskController from "../../src/presentation/controllers/task.controller";
import responseMessages from "../../src/presentation/resources/responseMessages";
import taskFailedValidation from "../../src/domain/domainResources/taskValidationMessages";
import taskRepository from "../../src/persistence/task.repository";

describe("Task deletion integration tests", () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: SinonSpy;

  describe("validation-oriented", () => {
    describe("bad requests (400)", () => {
      beforeEach(() => {
        sinon.replace(taskService, "deleteTaskRecord", sinon.fake());
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

      it("task ID is missing", async () => {
        req = { body: { id: undefined } };

        for (const middleware of taskController.deleteTask) {
          await middleware(req as Request, res as Response, next);
        }

        const statusStub = res.status as SinonStub;
        const jsonSpy = res.json as SinonSpy;

        assert.strictEqual(statusStub.calledWith(400), true);
        assert.strictEqual(
          jsonSpy.calledWith({
            message: responseMessages.BAD_REQUEST,
            errors: [
              { message: taskFailedValidation.TASK_ID_REQUIRED },
              { message: taskFailedValidation.TASK_ID_INVALID },
              { message: taskFailedValidation.TASK_ID_LENGTH },
            ],
          }),
          true
        );
      });

      testInput.invalidTaskInputs.TASK_ID_LENGTH_CASES.forEach(
        ([testName, invalidLengthId]) => {
          it(testName, async () => {
            req = { body: { id: invalidLengthId } };
            for (const middleware of taskController.deleteTask) {
              await middleware(req as Request, res as Response, next);
            }

            const statusStub = res.status as SinonStub;
            const jsonSpy = res.json as SinonSpy;

            assert.strictEqual(statusStub.calledWith(400), true);
            assert.strictEqual(
              jsonSpy.calledWith({
                message: responseMessages.BAD_REQUEST,
                errors: [{ message: taskFailedValidation.TASK_ID_LENGTH }],
              }),
              true
            );
          });
        }
      );

      testInput.invalidTaskInputs.TASK_ID_INVALID_CASES.forEach(
        ([testName, invalidId]) => {
          it(testName, async () => {
            req = { body: { id: invalidId } };
            for (const middleware of taskController.deleteTask) {
              await middleware(req as Request, res as Response, next);
            }

            const statusStub = res.status as SinonStub;
            const jsonSpy = res.json as SinonSpy;

            assert.strictEqual(statusStub.calledWith(400), true);
            assert.strictEqual(
              jsonSpy.calledWith({
                message: responseMessages.BAD_REQUEST,
                errors: [{ message: taskFailedValidation.TASK_ID_INVALID }],
              }),
              true
            );
          });
        }
      );
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
      methodStub = sinon.stub(taskRepository, "deleteTask");
    });

    afterEach(() => {
      sinon.restore();
    });

    it("server error (500)", async () => {
      req = {
        body: { id: "6792761a35c88a38d4ddcebe", ...testInput.validTaskInput },
      };

      methodStub.rejects();
      for (const middleware of taskController.deleteTask) {
        await middleware(req as Request, res as Response, next);
      }

      const statusStub = res.status as SinonStub;
      const jsonSpy = res.json as SinonSpy;

      assert.strictEqual(statusStub.calledWith(500), true);
      assert.strictEqual(
        jsonSpy.calledWith({
          message: commonService.SERVER_ERROR,
        }),
        true
      );
    });

    it("not found (404)", async () => {
      req = {
        body: { id: "6792761a35c88a38d4ddcebe", ...testInput.validTaskInput },
      };

      methodStub.resolves(null);
      for (const middleware of taskController.deleteTask) {
        await middleware(req as Request, res as Response, next);
      }

      const statusStub = res.status as SinonStub;
      const jsonSpy = res.json as SinonSpy;

      assert.strictEqual(statusStub.calledWith(404), true);
      assert.strictEqual(
        jsonSpy.calledWith({
          message: taskServiceResponses.TASK_NOT_FOUND,
        }),
        true
      );
    });
  });
});
