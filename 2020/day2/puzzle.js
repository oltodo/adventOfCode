module.exports.processInput = (input) => {
  return input.split("\n").map((line) => {
    const [, min, max, char, pwd] = line.match(/^(\d+)-(\d+) ([a-z]): (.+)/);

    return [Number(min), Number(max), char, pwd];
  });
};

module.exports.part1 = (input) => {
  return input.reduce((acc, curr) => {
    const [min, max, char, password] = curr;
    const reg = new RegExp(char, "g");
    const matches = password.match(reg) || [];

    if (matches.length >= min && matches.length <= max) {
      return acc + 1;
    }

    return acc;
  }, 0);
};

module.exports.part2 = (input) => {
  return input.reduce((acc, curr) => {
    const [index1, index2, char, password] = curr;

    const charAt1 = password[index1 - 1];
    const charAt2 = password[index2 - 1];

    if (charAt1 !== char && charAt2 !== char) {
      return acc;
    }
    if (charAt1 === char && charAt2 === char) {
      return acc;
    }

    return acc + 1;
  }, 0);
};
