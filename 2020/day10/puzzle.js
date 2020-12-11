const fs = require("fs");

const input = fs
  .readFileSync(`${__dirname}/input.txt`)
  .toString()
  .trim()
  .split("\n")
  .map((line) => parseInt(line, 10))
  .sort((a, b) => a - b);

console.log(input);

function getAnswer1() {
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
}

// I'm not the author of that solution
function getAnswer2() {
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
}

const answer1 = getAnswer1();
const answer2 = getAnswer2();

module.exports = [answer1, answer2];
