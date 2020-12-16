function getLastSpokenNumber(input, max) {
  let last = input.pop();

  const spokenNumbers = new Map();

  input.forEach((curr, index) => {
    spokenNumbers.set(curr, index + 1);
  }, {});

  for (let turn = input.length + 2; turn <= max; turn += 1) {
    const lastSpoken = spokenNumbers.get(last);

    let next;
    if (lastSpoken !== undefined) {
      next = turn - lastSpoken - 1;
    } else {
      next = 0;
    }

    spokenNumbers.set(last, turn - 1);
    last = next;
  }

  return last;
}

module.exports.processInput = (input) => {
  return input.split(",").map(Number);
};

module.exports.part1 = (input) => {
  return getLastSpokenNumber(input, 2020);
};

module.exports.part2 = (input) => {
  return getLastSpokenNumber(input, 30000000);
};
