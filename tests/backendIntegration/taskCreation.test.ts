/**
 * Task creation integration tests.
 */
import { createTask } from "../../src/presentation/controllers/task.controller";
import { createTaskRecord } from "../../src/service/task.service";
import sinon, { SinonStub, SinonSpy } from "sinon";
import testInput from "../testInput";
import { Request, Response } from "express";
import { responseMessages } from "../../src/presentation/resources/responseMessages";
import taskFailedValidation from "../../src/domain/resources/taskValidationMessages";
import { commonServiceResponses } from "../../src/service/resources/commonService.response";
import assert from "assert";
import * as taskRepository from "../../src/persistence/task.repository";

describe("Task creation  integration tests", () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: SinonSpy;

  describe("validation-oriented", () => {
    describe("bad requests (400)", () => {
      beforeEach(() => {
        sinon.replace({ createTaskRecord }, "createTaskRecord", sinon.fake());
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

      it("subject is empty", async () => {
        req = { body: { ...testInput.validTaskInput } };
        req.body.subject = "";

        for (const middleware of createTask) {
          await middleware(req as Request, res as Response, next);
        }

        const statusStub = res.status as SinonStub;
        const jsonSpy = res.json as SinonSpy;

        assert.strictEqual(statusStub.calledWith(400), true);
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
        req = { body: { ...testInput.validTaskInput } };
        req.body.subject = testInput.invalidTaskInputs.TOO_SHORT_SUBJECT;

        for (const middleware of createTask) {
          await middleware(req as Request, res as Response, next);
        }

        const statusStub = res.status as SinonStub;
        const jsonSpy = res.json as SinonSpy;

        assert.strictEqual(statusStub.calledWith(400), true);
        assert.strictEqual(
          jsonSpy.calledWith({
            message: responseMessages.BAD_REQUEST,
            errors: [{ message: taskFailedValidation.SUBJECT_MIN_LENGTH }],
          }),
          true
        );
      });

      it("subject is too long", async () => {
        req = { body: { ...testInput.validTaskInput } };
        req.body.subject = testInput.invalidTaskInputs.TOO_LONG_SUBJECT;

        for (const middleware of createTask) {
          await middleware(req as Request, res as Response, next);
        }

        const statusStub = res.status as SinonStub;
        const jsonSpy = res.json as SinonSpy;

        assert.strictEqual(statusStub.calledWith(400), true);
        assert.strictEqual(
          jsonSpy.calledWith({
            message: responseMessages.BAD_REQUEST,
            errors: [{ message: taskFailedValidation.SUBJECT_MAX_LENGTH }],
          }),
          true
        );
      });

      it("description is too long", async () => {
        req = { body: { ...testInput.validTaskInput } };
        req.body.description = testInput.invalidTaskInputs.TOO_LONG_DESCRIPTION;

        for (const middleware of createTask) {
          await middleware(req as Request, res as Response, next);
        }

        const statusStub = res.status as SinonStub;
        const jsonSpy = res.json as SinonSpy;

        assert.strictEqual(statusStub.calledWith(400), true);
        assert.strictEqual(
          jsonSpy.calledWith({
            message: responseMessages.BAD_REQUEST,
            errors: [{ message: taskFailedValidation.DESCRIPTION_MAX_LENGTH }],
          }),
          true
        );
      });

      it("status is missing", async () => {
        req = { body: { ...testInput.validTaskInput } };
        req.body.status = undefined;

        for (const middleware of createTask) {
          await middleware(req as Request, res as Response, next);
        }

        const statusStub = res.status as SinonStub;
        const jsonSpy = res.json as SinonSpy;

        assert.strictEqual(statusStub.calledWith(400), true);
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
        req = { body: { ...testInput.validTaskInput } };
        req.body.status = testInput.invalidTaskInputs.INVALID_STATUS;

        for (const middleware of createTask) {
          await middleware(req as Request, res as Response, next);
        }

        const statusStub = res.status as SinonStub;
        const jsonSpy = res.json as SinonSpy;

        assert.strictEqual(statusStub.calledWith(400), true);
        assert.strictEqual(
          jsonSpy.calledWith({
            message: responseMessages.BAD_REQUEST,
            errors: [{ message: taskFailedValidation.STATUS_INVALID }],
          }),
          true
        );
      });

      it("subject and status are missing", async () => {
        req = { body: { ...testInput.validTaskInput } };
        req.body.subject = undefined;
        req.body.status = undefined;

        for (const middleware of createTask) {
          await middleware(req as Request, res as Response, next);
        }

        const statusStub = res.status as SinonStub;
        const jsonSpy = res.json as SinonSpy;

        assert.strictEqual(statusStub.calledWith(400), true);
        assert.strictEqual(
          jsonSpy.calledWith({
            message: responseMessages.BAD_REQUEST,
            errors: [
              { message: taskFailedValidation.SUBJECT_REQUIRED },
              { message: taskFailedValidation.SUBJECT_MIN_LENGTH },
              { message: taskFailedValidation.STATUS_REQUIRED },
              { message: taskFailedValidation.STATUS_INVALID },
            ],
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
      methodStub = sinon.stub(taskRepository, "addTask");
    });

    afterEach(() => {
      sinon.restore();
    });

    it("server error (500)", async () => {
      req = { body: { ...testInput.validTaskInput } };

      methodStub.rejects();
      for (const middleware of createTask) {
        await middleware(req as Request, res as Response, next);
      }

      const statusStub = res.status as SinonStub;
      const jsonSpy = res.json as SinonSpy;

      assert.strictEqual(statusStub.calledWith(500), true);
      assert.strictEqual(
        jsonSpy.calledWith({ message: commonServiceResponses.SERVER_ERROR }),
        true
      );
    });
  });
});
