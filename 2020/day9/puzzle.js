const fs = require("fs");

const input = fs
  .readFileSync(`${__dirname}/input.txt`)
  .toString()
  .trim()
  .split("\n")
  .map((line) => parseInt(line, 10));

function sum(numbers) {
  return numbers.reduce((acc, curr) => acc + curr, 0);
}

function findSum(result, items, current = []) {
  for (let i = 0; i < items.length; i += 1) {
    const next = current.concat([items[i]]);
    const rest = items.slice(i + 1);

    if (next.length + rest.length < 2) {
      break;
    }

    if (next.length === 2) {
      if (sum(next) === result) {
        return next;
      }

      // eslint-disable-next-line no-continue
      continue;
    }

    const answer = findSum(result, rest, next);
    if (answer !== null) {
      return answer;
    }
  }

  return null;
}

function findSerie(result) {
  const fn = (items, current = []) => {
    const next = current.concat([items.shift()]);

    if (sum(next) === result) {
      return next;
    }

    if (items.length) {
      return fn(items, next);
    }

    return null;
  };

  for (let i = 0; i < input.length; i += 1) {
    const serie = fn(input.slice(i));
    if (serie) {
      return serie;
    }
  }

  return null;
}

function getAnswer1() {
  const preambleSize = 25;

  return input.slice(preambleSize).reduce((acc, curr, index) => {
    const preamble = input.slice(index, index + preambleSize);

    if (acc === null && findSum(curr, preamble) === null) {
      return curr;
    }

    return acc;
  }, null);
}

function getAnswer2(invalidNumber) {
  const serie = findSerie(invalidNumber);
  serie.sort();

  return serie[0] + serie[serie.length - 1];
}

const answer1 = getAnswer1();
const answer2 = getAnswer2(answer1);

module.exports = [answer1, answer2];
