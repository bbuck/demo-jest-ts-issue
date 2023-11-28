import { calculate } from "./calculator.js";

describe("calculate", () => {
  it("can add numbers", () => {
    expect(calculate("add", 1, 2)).toEqual(3);
  });

  it("doesn't support subtraction yet", () => {
    expect(() => calculate("subtract", 1, 2)).toThrow();
  });

  it("doesn't support multiplication yet", () => {
    expect(() => calculate("multiply", 1, 2)).toThrow();
  });

  it("doesn't support division yet", () => {
    expect(() => calculate("divide", 1, 2)).toThrow();
  });
});
