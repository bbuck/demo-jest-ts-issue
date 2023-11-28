import { add } from "@scope/foo";

type Operation = "add" | "subtract" | "divide" | "multiply";

export const calculate = (operation: Operation, a: number, b: number) => {
  if (operation === "add") {
    return add(a, b);
  }

  throw new Error(`The operation ${operation} is not implemented yet.`);
};
