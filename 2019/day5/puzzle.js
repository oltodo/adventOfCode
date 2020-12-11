/* eslint-disable no-continue */

function parseHeader(header) {
  const opcode = header % 100;

  const modes = [
    Math.floor(header / 100) % 10,
    Math.floor(header / 1000) % 10,
    Math.floor(header / 10000) % 10,
  ];

  return [opcode, modes];
}

function getDiagnosticCode(intcode, input) {
  const code = [...intcode];

  let output = null;

  for (let i = 0; i < code.length; ) {
    const [opcode, modes] = parseHeader(code[i]);

    if (opcode === 99) {
      return output;
    }

    let value1 = code[i + 1];
    let value2 = code[i + 2];

    if (modes[0] === 0) {
      value1 = code[value1];
    }
    if (modes[1] === 0) {
      value2 = code[value2];
    }

    if (opcode === 3) {
      code[code[i + 1]] = input;
      i += 2;
      continue;
    }
    if (opcode === 4) {
      output = value1;
      i += 2;
      continue;
    }

    if (opcode === 5) {
      i = value1 !== 0 ? value2 : i + 3;
      continue;
    }
    if (opcode === 6) {
      i = value1 === 0 ? value2 : i + 3;
      continue;
    }

    switch (opcode) {
      case 7:
        code[code[i + 3]] = value1 < value2 ? 1 : 0;
        break;
      case 8:
        code[code[i + 3]] = value1 === value2 ? 1 : 0;
        break;
      case 2:
        code[code[i + 3]] = value1 * value2;
        break;
      case 1:
        code[code[i + 3]] = value1 + value2;
        break;
      default:
        console.error(`Ouch! (${opcode})`);
        return null;
    }

    i += 4;
  }

  return null;
}

module.exports.processInput = (input) => {
  return input.split(",").map((line) => parseInt(line, 10));
};

module.exports.part1 = (input) => {
  return getDiagnosticCode(input, 1);
};

module.exports.part2 = (input) => {
  return getDiagnosticCode(input, 5);
};
