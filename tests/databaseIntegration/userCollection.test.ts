/**
 * User collection database integration tests.
 */
import mongoose, { ConnectOptions } from "mongoose";
import User from "../../src/domain/models/user.model";
import { responseMessages } from "../../src/presentation/resources/responseMessages";
import { registerUser } from "../../src/presentation/controllers/user.controller";
import * as dotenv from "dotenv";
import sinon, { SinonStub, SinonSpy } from "sinon";
import { Request, Response } from "express";
import testInput from "../testInput";
import assert from "assert";
dotenv.config();

describe("User collection database integration tests", () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: SinonSpy;

  before(async () => {
    await mongoose.connect(
      process.env.MONGODB_URI as string,
      { useNewUrlParser: true } as ConnectOptions
    );
  });

  after(async () => {
    await mongoose.connection.close();
  });

  beforeEach(() => {
    res = {
      status: sinon.stub().callsFake(() => {
        return res;
      }) as unknown as SinonStub,
      json: sinon.spy(),
    };

    next = sinon.spy();
  });

  afterEach(async () => {
    await User.deleteMany({});
    sinon.restore();
  });

  it("new user registered (201)", async () => {
    req = {
      body: testInput.validUserInput,
    };

    for (const middleware of registerUser) {
      await middleware(req as Request, res as Response, next);
    }

    const statusStub = res.status as SinonStub;
    const jsonSpy = res.json as SinonSpy;

    assert.strictEqual(statusStub.calledWith(201), true);
    assert.strictEqual(
      jsonSpy.calledWith({ message: responseMessages.USER_REGISTERED }),
      true
    );
  });
});
