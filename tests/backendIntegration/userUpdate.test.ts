import sinon, { SinonSpy, SinonStub } from "sinon";
import testInput from "../testInput";
import assert from "assert";
import { Request, Response } from "express";
import userService from "../../src/service/user.service";
import userController from "../../src/presentation/controllers/user.controller";
import responseMessages from "../../src/presentation/resources/responseMessages";
import userFailedValidation from "../../src/domain/domainResources/userValidationMessages";

describe("User update integration tests", () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: SinonSpy;

  describe("validation-oriented", () => {
    describe("bad requests (400)", () => {
      beforeEach(() => {
        sinon.replace(userService, "createUserProfile", sinon.fake());
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

        const statusSpy = res.status as SinonStub;
        const statusJson = res.json as SinonSpy;

        assert.strictEqual(statusSpy.calledWith(400), true);
        assert.strictEqual(
          statusJson.calledWith({
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

            const statusSpy = res.status as SinonStub;
            const statusJson = res.json as SinonSpy;

            assert.strictEqual(statusSpy.calledWith(400), true);
            assert.strictEqual(
              statusJson.calledWith({
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

            const statusSpy = res.status as SinonStub;
            const statusJson = res.json as SinonSpy;

            assert.strictEqual(statusSpy.calledWith(400), true);
            assert.strictEqual(
              statusJson.calledWith({
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
  });
});
