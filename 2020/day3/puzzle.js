function howManyTrees(input, slopeX, slopeY) {
  const patternWidth = input[0].length;
  const patternHeight = input.length;

  let altitude = patternHeight;
  let distance = 0;
  let trees = 0;

  while (altitude > 0) {
    const x = distance % patternWidth;
    const y = patternHeight - altitude;

    if (input[y][x]) {
      trees += 1;
    }

    distance += slopeX;
    altitude -= slopeY;
  }

  return trees;
}

module.exports.processInput = (input) => {
  return input.split("\n").map((line) => {
    return line.split("").map((char) => (char === "#" ? 1 : 0));
  });
};

module.exports.part1 = (input) => {
  return howManyTrees(input, 3, 1);
};

module.exports.part2 = (input) => {
  const slope1 = howManyTrees(input, 1, 1);
  const slope2 = howManyTrees(input, 3, 1);
  const slope3 = howManyTrees(input, 5, 1);
  const slope4 = howManyTrees(input, 7, 1);
  const slope5 = howManyTrees(input, 1, 2);

  return slope1 * slope2 * slope3 * slope4 * slope5;
};
