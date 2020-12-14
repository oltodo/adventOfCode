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

function repair(input) {
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

module.exports.processInput = (input) => {
  return input.split("\n").map((line) => {
    const [instruction, parameter] = line.split(" ");

    return [instruction, Number(parameter)];
  });
};

module.exports.part1 = (input) => {
  return analyze(input)[0];
};

module.exports.part2 = (input) => {
  return repair(input);
};
