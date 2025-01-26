/**
 * User service unit tests.
 */
import User from "../../src/domain/models/user.model";
import assert from "assert";
import {
  retrieveUserByUsername,
  createUserProfile,
  updateUserProfile,
} from "../../src/service/user.service";
import * as userRepository from "../../src/persistence/user.repository";
import testInput from "../testInput";
import sinon from "sinon";
import { NotFoundError } from "../../src/service/errors/notFound.error";
import { ServerError } from "../../src/persistence/errors/server.error";
import { IUserUpdate } from "../../src/presentation/interfaces/iUserUpdate.interface";

describe("User service unit test", () => {
  const validUser = new User(testInput.validUserInput);
  const mockUser = new User();
  const mockGeneralUpdateDataObj: IUserUpdate = {
    id: "678f6f5feeb9f5507709b24e",
  };
  let methodStub: sinon.SinonStub;

  describe("Promise rejects", () => {
    beforeEach(() => {
      sinon.restore();
    });

    describe("retrieveUserByUsername()", () => {
      beforeEach(() => {
        methodStub = sinon.stub(userRepository, "getUserByUsername");
      });

      afterEach(() => {
        methodStub.restore();
      });

      it("server error", async () => {
        methodStub.rejects();
        await assert.rejects(async () => {
          await retrieveUserByUsername(validUser.username);
        }, ServerError);
      });

      it("user not found", async () => {
        methodStub.resolves(null);
        await assert.rejects(async () => {
          await retrieveUserByUsername(validUser.username);
        }, NotFoundError);
      });
    });

    describe("createUserProfile()", () => {
      it("server error", async () => {
        sinon.stub(userRepository, "addUser").rejects();

        await assert.rejects(async () => {
          await createUserProfile(mockUser);
        }, ServerError);
      });
    });

    describe("updateUserProfile()", () => {
      beforeEach(() => {
        methodStub = sinon.stub(userRepository, "updateUserInfo");
      });

      afterEach(() => {
        methodStub.restore();
      });

      it("server error", async () => {
        methodStub.rejects();
        await assert.rejects(async () => {
          await updateUserProfile(mockGeneralUpdateDataObj);
        }, ServerError);
      });

      it("user not found", async () => {
        methodStub.resolves(null);
        await assert.rejects(async () => {
          await updateUserProfile(mockGeneralUpdateDataObj);
        }, NotFoundError);
      });
    });
  });
});
