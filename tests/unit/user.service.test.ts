/**
 * User service unit tests.
 */
import IUser from "../../src/domain/interfaces/iUser.interface";
import User from "../../src/domain/models/user.model";
import assert from "assert";
import userService from "../../src/service/user.service";
import userRepository from "../../src/persistence/user.repository";
import testInput from "../testInput";
import sinon from "sinon";
import NotFoundError from "../../src/service/errors/notFound.error";
import ServerError from "../../src/service/errors/server.error";
import IUserUpdateGeneral from "../../src/presentation/interfaces/iUserUpdateGeneral.interface";
import IUserUpdateAdmin from "../../src/presentation/interfaces/iUserUpdateAdmin.interface";

describe("User service unit test", () => {
  const validUser = new User(testInput.validUserInput);
  const mockUsers: IUser[] = [];
  const mockUser = new User();
  const mockGeneralUpdateDataObj: IUserUpdateGeneral = {
    id: "678f6f5feeb9f5507709b24e",
  };
  const mockAdminUpdateDataObj: IUserUpdateAdmin = {
    id: "678f6f5feeb9f5507709b24e",
    role: "general",
  };
  const mockId = "678f72307a6663eec0337095";
  let methodStub: sinon.SinonStub;

  describe("Promise rejects", () => {
    beforeEach(() => {
      sinon.restore();
    });

    describe("retrieveAllUsers()", () => {
      beforeEach(() => {
        methodStub = sinon.stub(userRepository, "getUsers");
      });

      afterEach(() => {
        methodStub.restore();
      });

      it("server error", async () => {
        methodStub.rejects();
        await assert.rejects(async () => {
          await userService.retrieveAllUsers();
        }, ServerError);
      });

      it("no users in db", async () => {
        methodStub.resolves(mockUsers);
        await assert.rejects(async () => {
          await userService.retrieveAllUsers();
        }, NotFoundError);
      });
    });

    describe("retrieveUsersByRole()", () => {
      beforeEach(() => {
        methodStub = sinon.stub(userRepository, "getUsersByRole");
      });

      afterEach(() => {
        methodStub.restore();
      });
      it("server error", async () => {
        methodStub.rejects();
        await assert.rejects(async () => {
          await userService.retrieveUsersByRole(validUser.role);
        }, ServerError);
      });

      it("users not found", async () => {
        methodStub.resolves(mockUsers);
        await assert.rejects(async () => {
          await userService.retrieveUsersByRole(validUser.role);
        }, NotFoundError);
      });
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
          await userService.retrieveUserByUsername(validUser.username);
        }, ServerError);
      });

      it("user not found", async () => {
        methodStub.resolves(null);
        await assert.rejects(async () => {
          await userService.retrieveUserByUsername(validUser.username);
        }, NotFoundError);
      });
    });

    describe("createUserProfile()", () => {
      it("server error", async () => {
        sinon.stub(userRepository, "addUser").rejects();

        await assert.rejects(async () => {
          await userService.createUserProfile(mockUser);
        }, ServerError);
      });
    });

    describe("updateProfileAsGeneralUser()", () => {
      beforeEach(() => {
        methodStub = sinon.stub(userRepository, "updateUserInfo");
      });

      afterEach(() => {
        methodStub.restore();
      });

      it("server error", async () => {
        methodStub.rejects();
        await assert.rejects(async () => {
          await userService.updateProfileAsGeneralUser(
            mockGeneralUpdateDataObj
          );
        }, ServerError);
      });

      it("user not found", async () => {
        methodStub.resolves(null);
        await assert.rejects(async () => {
          await userService.updateProfileAsGeneralUser(
            mockGeneralUpdateDataObj
          );
        }, NotFoundError);
      });
    });

    describe("updateProfileAsAdminUser()", () => {
      beforeEach(() => {
        methodStub = sinon.stub(userRepository, "updateUserInfo");
      });

      afterEach(() => {
        methodStub.restore();
      });

      it("server error", async () => {
        methodStub.rejects();
        await assert.rejects(async () => {
          await userService.updateProfileAsAdminUser(mockAdminUpdateDataObj);
        }, ServerError);
      });

      it("user not found", async () => {
        methodStub.resolves(null);
        await assert.rejects(async () => {
          await userService.updateProfileAsAdminUser(mockAdminUpdateDataObj);
        }, NotFoundError);
      });
    });

    describe("deleteUserProfile()", async () => {
      beforeEach(() => {
        methodStub = sinon.stub(userRepository, "deleteUserInfo");
      });

      afterEach(() => {
        methodStub.restore();
      });

      it("server error", async () => {
        methodStub.rejects();
        await assert.rejects(async () => {
          await userService.deleteUserProfile(mockId);
        }, ServerError);
      });

      it("user not found", async () => {
        methodStub.resolves(null);
        await assert.rejects(async () => {
          await userService.deleteUserProfile(mockId);
        }, NotFoundError);
      });
    });
  });
});
