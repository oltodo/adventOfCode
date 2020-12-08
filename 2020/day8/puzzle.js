const fs = require("fs");

const input = fs
  .readFileSync(`${__dirname}/input.txt`)
  .toString()
  .trim()
  .split("\n")
  .map((line) => {
    const [instruction, parameter] = line.split(" ");

    return [instruction, parseInt(parameter, 10)];
  });

function analyze(bootCode) {
  let acc = 0;
  let pointer = 0;
  const history = [];

  while (pointer < bootCode.length) {
    const [instruction, parameter] = bootCode[pointer];

    switch (instruction) {
      case "acc":
        acc += parameter;
        pointer += 1;
        break;
      case "jmp":
        pointer += parameter;
        break;
      case "nop":
      default:
        pointer += 1;
    }

    if (history.includes(pointer)) {
      return [acc, true];
    }

    history.push(pointer);
  }

  return [acc, false];
}

function repair() {
  for (let i = 0; i < input.length; i += 1) {
    const [instruction] = input[i];

    if (instruction !== "acc") {
      const bootCode = [...input];
      bootCode[i] = bootCode[i] === "nop" ? "jmp" : "nop";

      const [acc, infinite] = analyze(bootCode);

      if (!infinite) {
        return acc;
      }
    }
  }

  return 0;
}

const [answer1] = analyze(input);
const answer2 = repair();

module.exports = [answer1, answer2];
