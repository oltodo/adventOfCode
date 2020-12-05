/* eslint-disable no-continue */
const fs = require("fs");

const input = fs
  .readFileSync(`${__dirname}/input.txt`)
  .toString()
  .trim()
  .split("\n")
  .map((value) => parseInt(value, 10));

function sum(numbers) {
  return numbers.reduce((acc, curr) => acc + curr, 0);
}

function product(numbers) {
  return numbers.reduce((acc, curr) => acc * curr, 1);
}

function getAnswer(howMany, items = input, current = []) {
  for (let i = 0; i < items.length; i += 1) {
    const next = current.concat([items[i]]);
    const rest = items.slice(i + 1);

    if (next.length + rest.length < howMany) {
      break;
    }

    if (next.length === howMany) {
      if (sum(next) === 2020) {
        return product(next);
      }

      continue;
    }

    const answer = getAnswer(howMany, rest, next);
    if (answer !== null) {
      return answer;
    }
  }

  return null;
}

module.exports = [getAnswer(2), getAnswer(3)];
