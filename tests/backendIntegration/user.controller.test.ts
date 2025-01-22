//import IUser from "../../src/domain/interfaces/iUser.interface";
//import User from "../../src/domain/models/user.model";
import userController from "../../src/presentation/controllers/user.controller";
import userService from "../../src/service/user.service";
import sinon, { SinonSpy, SinonStub } from "sinon";
import testInput from "../testInput";
import assert from "assert";
import { Request, Response } from "express";
import responseMessages from "../../src/presentation/resources/responseMessages";
import userFailedValidation from "../../src/domain/domainResources/userValidationMessages";

describe.only("User controller integration tests", () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: SinonSpy;

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

    it("username is missing", async () => {
      req = {
        body: {
          username: "",
          email: testInput.validUserInput.email,
          password: testInput.validUserInput.password,
        },
      };

      for (const middleware of userController.registerUser) {
        await middleware(req as Request, res as Response, next);
      }

      const statusSpy = res.status as SinonStub;
      const statusJson = res.json as SinonSpy;

      assert.strictEqual(statusSpy.calledWith(400), true);
      assert.strictEqual(
        statusJson.calledWith({
          message: responseMessages.BAD_REQUEST,
          errors: [
            { message: userFailedValidation.USERNAME_REQUIRED },
            { message: userFailedValidation.USERNAME_MIN_LENGTH },
          ],
        }),
        true
      );
    });

    it("email is missing", async () => {
      req = {
        body: {
          username: testInput.validUserInput.username,
          email: undefined,
          password: testInput.validUserInput.password,
        },
      };

      for (const middleware of userController.registerUser) {
        await middleware(req as Request, res as Response, next);
      }

      const statusSpy = res.status as SinonStub;
      const statusJson = res.json as SinonSpy;

      assert.strictEqual(statusSpy.calledWith(400), true);
      assert.strictEqual(
        statusJson.calledWith({
          message: responseMessages.BAD_REQUEST,
          errors: [
            { message: userFailedValidation.EMAIL_REQUIRED },
            { message: userFailedValidation.EMAIL_INVALID },
          ],
        }),
        true
      );
    });
  });
});
