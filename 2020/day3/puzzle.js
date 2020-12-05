const fs = require("fs");

const pattern = fs
  .readFileSync(`${__dirname}/input.txt`)
  .toString()
  .trim()
  .split("\n")
  .map((line) => {
    return line.split("").map((char) => (char === "#" ? 1 : 0));
  });

const patternWidth = pattern[0].length;
const patternHeight = pattern.length;

function howManyTrees(slopeX, slopeY) {
  let altitude = patternHeight;
  let distance = 0;
  let trees = 0;

  while (altitude > 0) {
    const x = distance % patternWidth;
    const y = patternHeight - altitude;

    if (pattern[y][x]) {
      trees += 1;
    }

    distance += slopeX;
    altitude -= slopeY;
  }

  return trees;
}

const answer1 = howManyTrees(3, 1);

const slope1 = howManyTrees(1, 1);
const slope2 = howManyTrees(3, 1);
const slope3 = howManyTrees(5, 1);
const slope4 = howManyTrees(7, 1);
const slope5 = howManyTrees(1, 2);

const answer2 = slope1 * slope2 * slope3 * slope4 * slope5;

module.exports = [answer1, answer2];
