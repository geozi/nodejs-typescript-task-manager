/**
 * User update integration tests.
 */
import sinon, { SinonSpy, SinonStub } from "sinon";
import testInput from "../testInput";
import assert from "assert";
import { Request, Response } from "express";
import { createUserProfile } from "../../src/service/user.service";
import { userServiceResponses } from "../../src/service/resources/userService.response";
import { commonServiceResponses } from "../../src/service/resources/commonService.response";
import * as userController from "../../src/presentation/controllers/user.controller";
import { responseMessages } from "../../src/presentation/resources/responseMessages";
import userFailedValidation from "../../src/domain/resources/userValidationMessages";
import * as userRepository from "../../src/persistence/user.repository";
import { httpCodes } from "../../src/presentation/resources/responseStatusCodes";

describe("User update integration tests", () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: SinonSpy;

  describe("validation-oriented", () => {
    describe("bad requests (400)", () => {
      beforeEach(() => {
        sinon.replace({ createUserProfile }, "createUserProfile", sinon.fake());
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

      it("user ID is missing", async () => {
        req = { body: { id: undefined } };

        for (const middleware of userController.updateUserInfo) {
          await middleware(req as Request, res as Response, next);
        }

        const statusStub = res.status as SinonStub;
        const jsonSpy = res.json as SinonSpy;

        assert.strictEqual(statusStub.calledWith(httpCodes.BAD_REQUEST), true);
        assert.strictEqual(
          jsonSpy.calledWith({
            message: responseMessages.BAD_REQUEST,
            errors: [
              { message: userFailedValidation.USER_ID_REQUIRED },
              { message: userFailedValidation.USER_ID_INVALID },
              { message: userFailedValidation.USER_ID_LENGTH },
            ],
          }),
          true
        );
      });

      testInput.invalidUserInputs.USER_ID_LENGTH_CASES.forEach(
        ([testName, invalidLengthId]) => {
          it(testName, async () => {
            req = { body: { id: invalidLengthId } };

            for (const middleware of userController.updateUserInfo) {
              await middleware(req as Request, res as Response, next);
            }

            const statusStub = res.status as SinonStub;
            const jsonSpy = res.json as SinonSpy;

            assert.strictEqual(
              statusStub.calledWith(httpCodes.BAD_REQUEST),
              true
            );
            assert.strictEqual(
              jsonSpy.calledWith({
                message: responseMessages.BAD_REQUEST,
                errors: [
                  {
                    message: userFailedValidation.USER_ID_LENGTH,
                  },
                ],
              }),
              true
            );
          });
        }
      );

      testInput.invalidUserInputs.USER_ID_INVALID_CASES.forEach(
        ([testName, invalidId]) => {
          it(testName, async () => {
            req = { body: { id: invalidId } };

            for (const middleware of userController.updateUserInfo) {
              await middleware(req as Request, res as Response, next);
            }

            const statusStub = res.status as SinonStub;
            const jsonSpy = res.json as SinonSpy;

            assert.strictEqual(
              statusStub.calledWith(httpCodes.BAD_REQUEST),
              true
            );
            assert.strictEqual(
              jsonSpy.calledWith({
                message: responseMessages.BAD_REQUEST,
                errors: [
                  {
                    message: userFailedValidation.USER_ID_INVALID,
                  },
                ],
              }),
              true
            );
          });
        }
      );
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
        methodStub = sinon.stub(userRepository, "updateUserInfo");
      });

      afterEach(() => {
        sinon.restore();
      });

      it("server error (500)", async () => {
        req = {
          body: { id: "67921497a589726bf54dc5f1", ...testInput.validUserInput },
        };
        methodStub.rejects();
        for (const middleware of userController.updateUserInfo) {
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
        req = {
          body: { id: "67921497a589726bf54dc5f1", ...testInput.validUserInput },
        };
        methodStub.resolves(null);
        for (const middleware of userController.updateUserInfo) {
          await middleware(req as Request, res as Response, next);
        }
        const statusStub = res.status as SinonStub;
        const jsonSpy = res.json as SinonSpy;

        assert.strictEqual(statusStub.calledWith(httpCodes.NOT_FOUND), true);
        assert.strictEqual(
          jsonSpy.calledWith({
            message: userServiceResponses.USER_NOT_FOUND,
          }),
          true
        );
      });
    });
  });
});
