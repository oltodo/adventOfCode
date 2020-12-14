function findSum(result, items, current = [], total = 0) {
  for (let i = 0; i < items.length; i += 1) {
    const next = current.concat([items[i]]);
    const rest = items.slice(i + 1);

    if (next.length + rest.length < 2) {
      break;
    }

    if (next.length === 2) {
      if (total + items[i] === result) {
        return next;
      }

      // eslint-disable-next-line no-continue
      continue;
    }

    const answer = findSum(result, rest, next, total + items[i]);
    if (answer !== null) {
      return answer;
    }
  }

  return null;
}

function findSerie(input, result) {
  const fn = (items, current = [], total = 0) => {
    const item = items.shift();
    const next = current.concat([item]);

    if (total + item === result) {
      return next;
    }

    if (items.length) {
      return fn(items, next, total + item);
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

function getInvalidNumber(input) {
  const preambleSize = 25;

  return input.slice(preambleSize).reduce((acc, curr, index) => {
    const preamble = input.slice(index, index + preambleSize);

    if (acc === null && findSum(curr, preamble) === null) {
      return curr;
    }

    return acc;
  }, null);
}

module.exports.processInput = (input) => {
  return input.split("\n").map(Number);
};

module.exports.part1 = (input) => {
  return getInvalidNumber(input);
};

module.exports.part2 = (input) => {
  const serie = findSerie(input, getInvalidNumber(input));
  serie.sort();

  return serie[0] + serie[serie.length - 1];
};
