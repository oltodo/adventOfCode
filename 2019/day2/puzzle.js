function getValue(input, noun = null, verb = null) {
  const intcode = [...input];

  if (noun) intcode[1] = noun;
  if (verb) intcode[2] = verb;

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

module.exports.processInput = (input) => {
  return input.split(",").map(Number);
};

module.exports.part1 = (input) => {
  if (input[1] === 0 && input[2] === 0) {
    return getValue(input, 12, 2);
  }

  return getValue(input);
};

module.exports.part2 = (input) => {
  for (let i = 0; i <= 9999; i += 1) {
    const noun = Math.floor(i / 100);
    const verb = i % 100;

    if (getValue(input, noun, verb) === 19690720) {
      return i;
    }
  }

  return null;
};
