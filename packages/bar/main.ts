import { calculate } from "./src/calculator.js";

const [, , a, b] = process.argv;

console.log(
  `${a} + ${b} =`,
  calculate("add", parseInt(a, 10), parseInt(b, 10))
);
