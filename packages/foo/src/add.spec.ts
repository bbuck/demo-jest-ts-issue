import { add } from "./add.js";

describe("add", () => {
  it("adds numbers", () => {
    expect(add(1, 2)).toEqual(3);
  });
});
