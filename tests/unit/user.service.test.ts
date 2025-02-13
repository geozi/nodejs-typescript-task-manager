/**
 * User service unit tests.
 */
import User from "../../src/domain/models/user.model";
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
import * as chai from "chai";
import chaiAsPromised from "chai-as-promised";
chai.use(chaiAsPromised);

describe("User service unit tests", () => {
  const validUser = new User(testInput.validUserInput);
  const mockGeneralUpdateDataObj: IUserUpdate = {
    id: "678f6f5feeb9f5507709b24e",
  };
  let methodStub: sinon.SinonStub;

  describe("retrieveUserByUsername()", () => {
    beforeEach(() => {
      methodStub = sinon.stub(userRepository, "getUserByUsername");
    });

    afterEach(() => {
      methodStub.restore();
    });

    it("server error", async () => {
      methodStub.rejects();

      await chai
        .expect(retrieveUserByUsername(validUser.username))
        .to.be.rejectedWith(ServerError);
    });

    it("user not found", async () => {
      methodStub.resolves(null);

      await chai
        .expect(retrieveUserByUsername(validUser.username))
        .to.be.rejectedWith(NotFoundError);
    });
  });

  describe("createUserProfile()", () => {
    beforeEach(() => {
      methodStub = sinon.stub(userRepository, "addUser");
    });

    afterEach(() => {
      methodStub.restore();
    });

    it("server error", async () => {
      methodStub.rejects();

      await chai
        .expect(createUserProfile(new User(validUser)))
        .to.be.rejectedWith(ServerError);
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

      await chai
        .expect(updateUserProfile(mockGeneralUpdateDataObj))
        .to.be.rejectedWith(ServerError);
    });

    it("not found", async () => {
      methodStub.resolves(null);

      await chai
        .expect(updateUserProfile(mockGeneralUpdateDataObj))
        .to.be.rejectedWith(NotFoundError);
    });
  });
});
