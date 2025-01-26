/**
 * User model unit tests.
 */
import User from "../../src/domain/models/user.model";
import assert from "assert";
import userFailedValidation from "../../src/domain/resources/userValidationMessages";
import { IUser } from "../../src/domain/interfaces/iUser.interface";
import testInput from "../testInput";

describe("User model unit test", () => {
  let newUser: IUser;

  beforeEach(() => {
    newUser = new User(testInput.validUserInput);
  });

  it("has valid inputs", () => {
    const err = newUser.validateSync();

    assert.strictEqual(err, undefined);
  });

  it("has too short username", () => {
    newUser.username = testInput.invalidUserInputs.TOO_SHORT_USERNAME;
    const err = newUser.validateSync();

    assert.strictEqual(
      err?.errors.username.message,
      userFailedValidation.USERNAME_MIN_LENGTH
    );
  });

  it("has too long username", () => {
    newUser.username = testInput.invalidUserInputs.TOO_LONG_USERNAME;
    const err = newUser.validateSync();

    assert.strictEqual(
      err?.errors.username.message,
      userFailedValidation.USERNAME_MAX_LENGTH
    );
  });

  testInput.invalidUserInputs.EMAIL_INVALID_CASES.forEach(
    ([testName, invalidEmail]) => {
      it(testName, () => {
        newUser.email = invalidEmail;
        const err = newUser.validateSync();

        assert.strictEqual(
          err?.errors.email.message,
          userFailedValidation.EMAIL_INVALID
        );
      });
    }
  );
});
