module.exports.processInput = (input) => {
  return input
    .split("\n")
    .map(Number)
    .sort((a, b) => a - b);
};

module.exports.part1 = (input) => {
  let diff1 = 0;
  let diff3 = 1;

  for (let i = 0; i < input.length; i += 1) {
    const diff = input[i] - (input[i - 1] || 0);

    if (diff === 1) {
      diff1 += 1;
    } else if (diff === 3) {
      diff3 += 1;
    }
  }

  return diff1 * diff3;
};

module.exports.part2 = (input) => {
  // I'm not the author of that solution
  return input
    .reduce(
      (acc, value) => {
        acc[value] =
          (acc[value - 3] || 0) + (acc[value - 2] || 0) + (acc[value - 1] || 0);
        return acc;
      },
      [0, 0, 1]
    )
    .pop();
};
