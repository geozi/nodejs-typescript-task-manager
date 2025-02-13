/**
 * User repository unit tests.
 */
import User from "../../src/domain/models/user.model";
import sinon from "sinon";
import {
  addUser,
  getUserByEmail,
  getUserByUsername,
  updateUserInfo,
} from "../../src/persistence/user.repository";
import testInput from "../testInput";
import assert from "assert";
import { IUser } from "../../src/domain/interfaces/iUser.interface";
import { Types } from "mongoose";

describe("User repository unit tests", () => {
  let newUser: IUser;
  const mockUser = new User();
  const mockId = new Types.ObjectId("67add6a3bb16b4152728b94b");

  describe("getUserByUsername()", () => {
    beforeEach(() => {
      sinon.restore();
    });

    it("Promise resolves to User object", async () => {
      sinon.stub(User, "findOne").resolves(mockUser);
      const foundUser = await getUserByUsername(
        testInput.validUserInput.username
      );

      assert(foundUser instanceof User);
    });

    it("Promise resolves to null", async () => {
      sinon.stub(User, "findOne").resolves(null);
      const foundUser = await getUserByUsername(
        testInput.validUserInput.username
      );

      assert.strictEqual(foundUser, null);
    });
  });

  describe("getUserByEmail()", () => {
    beforeEach(() => {
      sinon.restore();
    });

    it("Promise resolves to User object", async () => {
      sinon.stub(User, "findOne").resolves(mockUser);
      const foundUser = await getUserByEmail(testInput.validUserInput.email);

      assert(foundUser instanceof User);
    });

    it("Promise resolves to null", async () => {
      sinon.stub(User, "findOne").resolves(null);
      const foundUser = await getUserByEmail(testInput.validUserInput.email);

      assert.strictEqual(foundUser, null);
    });
  });

  describe("addUser()", () => {
    beforeEach(() => {
      sinon.restore();
      newUser = new User();
    });

    it("Promise resolves to User object", async () => {
      sinon.stub(User.prototype, "save").resolves(mockUser);
      const savedUser = await addUser(newUser);

      assert(savedUser instanceof User);
    });
  });

  describe("updateUserInfo()", () => {
    beforeEach(() => {
      sinon.restore();
    });

    it("Promise resolves to User object", async () => {
      sinon.stub(User, "findByIdAndUpdate").resolves(mockUser);
      const updatedUser = await updateUserInfo({
        id: mockId,
        ...testInput.validUserInput,
      });

      assert(updatedUser instanceof User);
    });

    it("Promise resolves to null", async () => {
      sinon.stub(User, "findByIdAndUpdate").resolves(null);
      const updatedUser = await updateUserInfo({
        id: mockId,
        ...testInput.validUserInput,
      });

      assert.strictEqual(updatedUser, null);
    });
  });
});
