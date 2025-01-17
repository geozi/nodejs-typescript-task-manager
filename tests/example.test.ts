import assert from "assert";
import sinon from "sinon";

describe("This is an example test", () => {
  it("testing", () => {
    const someFake = sinon.fake.returns(true);
    assert.equal(someFake(), true);
  });

  it("some Other test", () => {
    assert.notEqual(1, 2);
  });
});
