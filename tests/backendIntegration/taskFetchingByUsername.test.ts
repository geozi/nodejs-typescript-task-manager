/**
 * Task fetching by username integration tests.
 */
import sinon, { SinonSpy, SinonStub } from "sinon";
import testInput from "../testInput";
import assert from "assert";
import { Request, Response } from "express";
import { retrieveTasksByUsername } from "../../src/service/task.service";
import { taskServiceResponses } from "../../src/service/resources/taskService.response";
import { commonServiceResponses } from "../../src/service/resources/commonService.response";
import { fetchTasksByUsername } from "../../src/presentation/controllers/task.controller";
import { responseMessages } from "../../src/presentation/resources/responseMessages";
import * as taskRepository from "../../src/persistence/task.repository";
import userFailedValidation from "../../src/domain/resources/userValidationMessages";
import { ITask } from "../../src/domain/interfaces/iTask.interface";

describe("Username-based task fetching integration tests", () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: SinonSpy;

  describe("validation-oriented", () => {
    describe("bad requests (400)", () => {
      beforeEach(() => {
        sinon.replace(
          { retrieveTasksByUsername },
          "retrieveTasksByUsername",
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

      it("username is missing", async () => {
        req = { body: { username: undefined } };

        for (const middleware of fetchTasksByUsername) {
          await middleware(req as Request, res as Response, next);
        }

        const statusStub = res.status as SinonStub;
        const jsonSpy = res.json as SinonSpy;

        assert.strictEqual(statusStub.calledWith(400), true);
        assert.strictEqual(
          jsonSpy.calledWith({
            message: responseMessages.BAD_REQUEST,
            errors: [
              { message: userFailedValidation.USERNAME_REQUIRED },
              { message: userFailedValidation.USERNAME_MIN_LENGTH },
            ],
          }),
          true
        );
      });

      it("username is too short", async () => {
        req = {
          body: { username: testInput.invalidUserInputs.TOO_SHORT_USERNAME },
        };

        for (const middleware of fetchTasksByUsername) {
          await middleware(req as Request, res as Response, next);
        }

        const statusStub = res.status as SinonStub;
        const jsonSpy = res.json as SinonSpy;

        assert.strictEqual(statusStub.calledWith(400), true);
        assert.strictEqual(
          jsonSpy.calledWith({
            message: responseMessages.BAD_REQUEST,
            errors: [{ message: userFailedValidation.USERNAME_MIN_LENGTH }],
          }),
          true
        );
      });

      it("username is too long", async () => {
        req = {
          body: { username: testInput.invalidUserInputs.TOO_LONG_USERNAME },
        };

        for (const middleware of fetchTasksByUsername) {
          await middleware(req as Request, res as Response, next);
        }

        const statusStub = res.status as SinonStub;
        const jsonSpy = res.json as SinonSpy;

        assert.strictEqual(statusStub.calledWith(400), true);
        assert.strictEqual(
          jsonSpy.calledWith({
            message: responseMessages.BAD_REQUEST,
            errors: [{ message: userFailedValidation.USERNAME_MAX_LENGTH }],
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
      methodStub = sinon.stub(taskRepository, "getTasksByUsername");
    });

    afterEach(() => {
      sinon.restore();
    });

    it("server error (500)", async () => {
      req = { body: { username: testInput.validUserInput.username } };

      methodStub.rejects();
      for (const middleware of fetchTasksByUsername) {
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

    it("not found (404)", async () => {
      req = { body: { username: testInput.validUserInput.username } };
      const mockTasks: ITask[] = [];

      methodStub.resolves(mockTasks);
      for (const middleware of fetchTasksByUsername) {
        await middleware(req as Request, res as Response, next);
      }

      const statusStub = res.status as SinonStub;
      const jsonSpy = res.json as SinonSpy;

      assert.strictEqual(statusStub.calledWith(404), true);
      assert.strictEqual(
        jsonSpy.calledWith({ message: taskServiceResponses.TASKS_NOT_FOUND }),
        true
      );
    });
  });
});
