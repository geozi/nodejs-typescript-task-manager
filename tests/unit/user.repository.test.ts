/**
 * User repository unit tests.
 */
import mongoose from "mongoose";
import User from "../../src/domain/models/user.model";
import sinon from "sinon";
import { addUser } from "../../src/persistence/user.repository";
import testInput from "../testInput";
import assert from "assert";
import { IUser } from "../../src/domain/interfaces/iUser.interface";

describe("User repository unit test", () => {
  let newUser: IUser;

  describe("addUser() test(s)", () => {
    describe("Promise<IUser> resolves", () => {
      beforeEach(() => {
        sinon.stub(User.prototype, "save").resolves({});
      });

      afterEach(() => {
        sinon.restore();
      });

      it("user added", () => {
        newUser = new User(testInput.validUserInput);

        assert.doesNotReject(async () => {
          await addUser(newUser);
        });
      });
    });

    describe("Promise<IUser> rejects", () => {
      beforeEach(() => {
        sinon
          .stub(User.prototype, "save")
          .rejects(new mongoose.Error.ValidationError());
      });

      afterEach(() => {
        sinon.restore();
      });

      it("has too short username", () => {
        newUser = new User(testInput.validUserInput);
        newUser.username = testInput.invalidUserInputs.TOO_SHORT_USERNAME;

        assert.rejects(async () => {
          await addUser(newUser);
        }, mongoose.Error.ValidationError);
      });

      it("has too long username", () => {
        newUser = new User(testInput.validUserInput);
        newUser.username = testInput.invalidUserInputs.TOO_LONG_USERNAME;

        assert.rejects(async () => {
          await addUser(newUser);
        }, mongoose.Error.ValidationError);
      });

      testInput.invalidUserInputs.EMAIL_INVALID_CASES.forEach(
        ([testName, invalidEmail]) => {
          it(testName, () => {
            newUser = new User(testInput.validUserInput);
            newUser.email = invalidEmail;

            assert.rejects(async () => {
              await addUser(newUser);
            }, mongoose.Error.ValidationError);
          });
        }
      );
    });
  });
});
