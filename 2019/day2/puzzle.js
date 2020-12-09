const fs = require("fs");

const input = fs
  .readFileSync(`${__dirname}/input.txt`)
  .toString()
  .trim()
  .split(",")
  .map((line) => parseInt(line, 10));

function getAnswer1(noun, verb) {
  const intcode = [...input];

  intcode[1] = noun;
  intcode[2] = verb;

  for (let i = 0; i < intcode.length; i += 4) {
    const [opcode, input1, input2, output] = intcode.slice(i, i + 4);

    if (opcode === 99) {
      return intcode[0];
    }

    intcode[output] =
      opcode === 2
        ? intcode[input1] * intcode[input2]
        : intcode[input1] + intcode[input2];
  }

  return null;
}

function getAnswer2() {
  for (let i = 0; i <= 9999; i += 1) {
    const noun = Math.floor(i / 100);
    const verb = i % 100;

    if (getAnswer1(noun, verb) === 19690720) {
      return i;
    }
  }

  return null;
}

module.exports = [getAnswer1(12, 2), getAnswer2()];
