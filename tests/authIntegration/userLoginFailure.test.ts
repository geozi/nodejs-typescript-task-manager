/**
 * User failed login integration test.
 */
import sinon, { SinonStub, SinonSpy } from "sinon";
import { Request, Response } from "express";
import testInput from "../testInput";
import authController from "../../src/auth/auth.controller";
import assert from "assert";
import userFailedValidation from "../../src/domain/resources/userValidationMessages";
import responseMessages from "../../src/presentation/resources/responseMessages";
import userRepository from "../../src/persistence/user.repository";
import commonService from "../../src/service/resources/commonService.response";
import userServiceResponses from "../../src/service/resources/userService.response";

describe("User failed login integration test", () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: SinonSpy;

  describe("validation-oriented", () => {
    describe("bad request (400)", () => {
      beforeEach(() => {
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

      it("username is undefined", async () => {
        req = {
          body: {
            username: undefined,
            password: testInput.validUserInput.password,
          },
        };

        for (const middleware of authController.loginUser) {
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
          body: {
            username: testInput.invalidUserInputs.TOO_SHORT_USERNAME,
            password: testInput.validUserInput.password,
          },
        };

        for (const middleware of authController.loginUser) {
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
          body: {
            username: testInput.invalidUserInputs.TOO_LONG_USERNAME,
            password: testInput.validUserInput.password,
          },
        };

        for (const middleware of authController.loginUser) {
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

      it("password is undefined", async () => {
        req = {
          body: {
            username: testInput.validUserInput.username,
            password: undefined,
          },
        };

        for (const middleware of authController.loginUser) {
          await middleware(req as Request, res as Response, next);
        }

        const statusStub = res.status as SinonStub;
        const jsonSpy = res.json as SinonSpy;

        assert.strictEqual(statusStub.calledWith(400), true);
        assert.strictEqual(
          jsonSpy.calledWith({
            message: responseMessages.BAD_REQUEST,
            errors: [
              { message: userFailedValidation.PASSWORD_REQUIRED },
              { message: userFailedValidation.PASSWORD_MIN_LENGTH },
              { message: userFailedValidation.PASSWORD_MUST_HAVE_CHARACTERS },
            ],
          }),
          true
        );
      });

      it("password is too short", async () => {
        req = {
          body: {
            username: testInput.validUserInput.username,
            password: testInput.invalidUserInputs.TOO_SHORT_PASSWORD,
          },
        };

        for (const middleware of authController.loginUser) {
          await middleware(req as Request, res as Response, next);
        }

        const statusStub = res.status as SinonStub;
        const jsonSpy = res.json as SinonSpy;

        assert.strictEqual(statusStub.calledWith(400), true);
        assert.strictEqual(
          jsonSpy.calledWith({
            message: responseMessages.BAD_REQUEST,
            errors: [{ message: userFailedValidation.PASSWORD_MIN_LENGTH }],
          }),
          true
        );
      });

      testInput.invalidUserInputs.PASSWORD_INVALID_CASES.forEach(
        ([testName, invalidPassword]) => {
          it(testName, async () => {
            req = {
              body: {
                username: testInput.validUserInput.username,
                password: invalidPassword,
              },
            };

            for (const middleware of authController.loginUser) {
              await middleware(req as Request, res as Response, next);
            }

            const statusStub = res.status as SinonStub;
            const jsonSpy = res.json as SinonSpy;

            assert.strictEqual(statusStub.calledWith(400), true);
            assert.strictEqual(
              jsonSpy.calledWith({
                message: responseMessages.BAD_REQUEST,
                errors: [
                  {
                    message: userFailedValidation.PASSWORD_MUST_HAVE_CHARACTERS,
                  },
                ],
              }),
              true
            );
          });
        }
      );

      it("username and password are undefined", async () => {
        req = { body: { username: undefined, password: undefined } };

        for (const middleware of authController.loginUser) {
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
              { message: userFailedValidation.PASSWORD_REQUIRED },
              { message: userFailedValidation.PASSWORD_MIN_LENGTH },
              { message: userFailedValidation.PASSWORD_MUST_HAVE_CHARACTERS },
            ],
          }),
          true
        );
      });
    });
  });

  describe("promise-oriented", async () => {
    let methodStub: SinonStub;

    beforeEach(() => {
      res = {
        status: sinon.stub().callsFake(() => {
          return res;
        }) as unknown as SinonStub,
        json: sinon.spy(),
      };

      next = sinon.spy();
      methodStub = sinon.stub(userRepository, "getUserByUsername");
    });

    afterEach(() => {
      sinon.restore();
    });

    it("server error (500)", async () => {
      req = {
        body: {
          username: testInput.validUserInput.username,
          password: testInput.validUserInput.password,
        },
      };

      methodStub.rejects();
      for (const middleware of authController.loginUser) {
        await middleware(req as Request, res as Response, next);
      }

      const statusStub = res.status as SinonStub;
      const jsonSpy = res.json as SinonSpy;

      assert.strictEqual(statusStub.calledWith(500), true);
      assert.strictEqual(
        jsonSpy.calledWith({ message: commonService.SERVER_ERROR }),
        true
      );
    });

    it("not found (401)", async () => {
      req = {
        body: {
          username: testInput.validUserInput.username,
          password: testInput.validUserInput.password,
        },
      };

      methodStub.resolves(null);
      for (const middleware of authController.loginUser) {
        await middleware(req as Request, res as Response, next);
      }

      const statusStub = res.status as SinonStub;
      const jsonSpy = res.json as SinonSpy;

      assert.strictEqual(statusStub.calledWith(401), true);
      assert.strictEqual(
        jsonSpy.calledWith({ message: userServiceResponses.USER_NOT_FOUND }),
        true
      );
    });
  });
});
