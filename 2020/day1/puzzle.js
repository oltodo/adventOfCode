/* eslint-disable no-continue */

function sum(numbers) {
  return numbers.reduce((acc, curr) => acc + curr, 0);
}

function product(numbers) {
  return numbers.reduce((acc, curr) => acc * curr, 1);
}

function getAnswer(howMany, items, current = []) {
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

module.exports.processInput = (input) => {
  return input.split("\n").map(Number);
};

module.exports.part1 = (input) => {
  return getAnswer(2, input);
};

module.exports.part2 = (input) => {
  return getAnswer(3, input);
};
