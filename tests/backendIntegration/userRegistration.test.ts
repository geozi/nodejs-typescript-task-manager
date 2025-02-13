/**
 * User registration integration tests.
 */
import { registerUser } from "../../src/presentation/controllers/user.controller";
import { createUserProfile } from "../../src/service/user.service";
import sinon, { SinonSpy, SinonStub } from "sinon";
import testInput from "../testInput";
import assert from "assert";
import { Request, Response } from "express";
import { responseMessages } from "../../src/presentation/resources/responseMessages";
import userFailedValidation from "../../src/domain/resources/userValidationMessages";
import * as userRepository from "../../src/persistence/user.repository";
import { commonServiceResponses } from "../../src/service/resources/commonService.response";

describe("User registration integration tests", () => {
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

      it("username is empty", async () => {
        req = { body: { ...testInput.validUserInput } };
        req.body.username = "";

        for (const middleware of registerUser) {
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
        req = { body: { ...testInput.validUserInput } };
        req.body.username = testInput.invalidUserInputs.TOO_SHORT_USERNAME;

        for (const middleware of registerUser) {
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
        req = { body: { ...testInput.validUserInput } };
        req.body.username = testInput.invalidUserInputs.TOO_LONG_USERNAME;

        for (const middleware of registerUser) {
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

      it("email is undefined", async () => {
        req = { body: { ...testInput.validUserInput } };
        req.body.email = undefined;

        for (const middleware of registerUser) {
          await middleware(req as Request, res as Response, next);
        }

        const statusStub = res.status as SinonStub;
        const jsonSpy = res.json as SinonSpy;

        assert.strictEqual(statusStub.calledWith(400), true);
        assert.strictEqual(
          jsonSpy.calledWith({
            message: responseMessages.BAD_REQUEST,
            errors: [
              { message: userFailedValidation.EMAIL_REQUIRED },
              { message: userFailedValidation.EMAIL_INVALID },
            ],
          }),
          true
        );
      });

      testInput.invalidUserInputs.EMAIL_INVALID_CASES.forEach(
        ([testName, invalidEmail]) => {
          it(testName, async () => {
            req = { body: { ...testInput.validUserInput } };
            req.body.email = invalidEmail;

            for (const middleware of registerUser) {
              await middleware(req as Request, res as Response, next);
            }

            const statusStub = res.status as SinonStub;
            const jsonSpy = res.json as SinonSpy;

            assert.strictEqual(statusStub.calledWith(400), true);
            assert.strictEqual(
              jsonSpy.calledWith({
                message: responseMessages.BAD_REQUEST,
                errors: [{ message: userFailedValidation.EMAIL_INVALID }],
              }),
              true
            );
          });
        }
      );

      it("password is empty", async () => {
        req = { body: { ...testInput.validUserInput } };
        req.body.password = undefined;

        for (const middleware of registerUser) {
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
        req = { body: { ...testInput.validUserInput } };
        req.body.password = testInput.invalidUserInputs.TOO_SHORT_PASSWORD;

        for (const middleware of registerUser) {
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
            req = { body: { ...testInput.validUserInput } };
            req.body.password = invalidPassword;

            for (const middleware of registerUser) {
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

      it("username and password missing", async () => {
        req = { body: { ...testInput.validUserInput } };
        req.body.username = undefined;
        req.body.password = "";

        for (const middleware of registerUser) {
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
      methodStub = sinon.stub(userRepository, "addUser");
    });

    afterEach(() => {
      sinon.restore();
    });

    it("server error (500)", async () => {
      req = { body: { ...testInput.validUserInput } };

      methodStub.rejects();
      for (const middleware of registerUser) {
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
