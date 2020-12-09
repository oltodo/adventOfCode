/* eslint-disable no-continue */
const fs = require("fs");

const intcode = fs
  .readFileSync(`${__dirname}/input.txt`)
  .toString()
  .trim()
  .split(",")
  .map((line) => parseInt(line, 10));

function parseHeader(header) {
  const opcode = header % 100;

  const modes = [
    Math.floor(header / 100) % 10,
    Math.floor(header / 1000) % 10,
    Math.floor(header / 10000) % 10,
  ];

  return [opcode, modes];
}

function getDiagnosticCode(input) {
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

const answer1 = getDiagnosticCode(1);
const answer2 = getDiagnosticCode(5);

module.exports = [answer1, answer2];
