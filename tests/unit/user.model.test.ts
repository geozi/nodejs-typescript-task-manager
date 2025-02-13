/**
 * User model unit tests.
 */
import User from "../../src/domain/models/user.model";
import assert from "assert";
import userFailedValidation from "../../src/domain/resources/userValidationMessages";
import { IUser } from "../../src/domain/interfaces/iUser.interface";
import testInput from "../testInput";
import sinon from "sinon";
import mongoose from "mongoose";

describe("User model unit tests", () => {
  let newUser: IUser;

  describe("Successful validation", () => {
    beforeEach(() => {
      sinon.restore();
      newUser = new User(testInput.validUserInput);
    });

    it("has valid inputs", () => {
      sinon.replace(
        User.prototype,
        "validateSync",
        sinon.stub().returns(undefined)
      );

      const err = newUser.validateSync();

      assert.strictEqual(err, undefined);
    });
  });

  describe("Failed validation", () => {
    let validationError: mongoose.Error.ValidationError;

    beforeEach(() => {
      sinon.restore();
      newUser = new User();
      validationError = new mongoose.Error.ValidationError();
    });

    it("has too short username", () => {
      validationError.errors = {
        username: new mongoose.Error.ValidatorError({
          message: userFailedValidation.USERNAME_MIN_LENGTH,
          path: "username",
          value: testInput.invalidUserInputs.TOO_SHORT_USERNAME,
        }),
      };

      sinon.replace(
        User.prototype,
        "validateSync",
        sinon.stub().returns(validationError)
      );

      const err = newUser.validateSync();

      assert.notStrictEqual(err, undefined);

      assert.strictEqual(
        err?.errors.username.message,
        userFailedValidation.USERNAME_MIN_LENGTH
      );
    });

    it("has too long username", () => {
      validationError.errors = {
        username: new mongoose.Error.ValidatorError({
          message: userFailedValidation.USERNAME_MAX_LENGTH,
          path: "username",
          value: testInput.invalidUserInputs.TOO_LONG_USERNAME,
        }),
      };

      sinon.replace(
        User.prototype,
        "validateSync",
        sinon.stub().returns(validationError)
      );

      const err = newUser.validateSync();

      assert.notStrictEqual(err, undefined);

      assert.strictEqual(
        err?.errors.username.message,
        userFailedValidation.USERNAME_MAX_LENGTH
      );
    });

    testInput.invalidUserInputs.EMAIL_INVALID_CASES.forEach(
      ([testName, invalidEmail]) => {
        it(testName, () => {
          validationError.errors = {
            email: new mongoose.Error.ValidatorError({
              message: userFailedValidation.EMAIL_INVALID,
              path: "email",
              value: invalidEmail,
            }),
          };

          sinon.replace(
            User.prototype,
            "validateSync",
            sinon.stub().returns(validationError)
          );

          const err = newUser.validateSync();

          assert.notStrictEqual(err, undefined);

          assert.strictEqual(
            err?.errors.email.message,
            userFailedValidation.EMAIL_INVALID
          );
        });
      }
    );
  });
});
