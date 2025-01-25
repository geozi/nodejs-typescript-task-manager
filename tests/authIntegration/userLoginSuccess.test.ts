/**
 * User successful login integration test.
 */

import sinon, { SinonStub, SinonSpy } from "sinon";
import User from "../../src/domain/models/user.model";
import { Request, Response } from "express";
import testInput from "../testInput";
import authController from "../../src/auth/auth.controller";
import assert from "assert";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import IUser from "../../src/domain/interfaces/iUser.interface";

describe("User successful login integration test", () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: SinonSpy;
  let findOneStub: SinonStub;
  let bcryptCompareStub: SinonStub;
  let jwtSignStub: SinonStub;

  beforeEach(() => {
    res = {
      status: sinon.stub().callsFake(() => {
        return res;
      }) as unknown as SinonStub,
      json: sinon.spy(),
    };

    next = sinon.spy();

    findOneStub = sinon.stub(User, "findOne");
    bcryptCompareStub = sinon.stub(bcrypt, "compare");
    jwtSignStub = sinon.stub(jwt, "sign");
  });

  afterEach(() => {
    sinon.restore();
  });

  it("valid inputs", async () => {
    const mockUser: Partial<IUser> = {};
    findOneStub.resolves(mockUser);
    bcryptCompareStub.resolves(true);
    jwtSignStub.returns(testInput.testToken);

    req = {
      body: {
        username: testInput.validUserInput.username,
        password: testInput.validUserInput.password,
      },
    };

    for (const middleware of authController.loginUser) {
      await middleware(req as Request, res as Response, next);
    }

    const statusStub = res.status as SinonStub;
    const jsonSpy = res.json as SinonSpy;

    assert.strictEqual(statusStub.calledWith(200), true);
    assert.strictEqual(
      jsonSpy.calledWith({
        token: testInput.testToken,
      }),
      true
    );
  });
});
