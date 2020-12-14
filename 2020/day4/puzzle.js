const isYear = require("../../utils/isYear");

const requiredKeys = ["byr", "iyr", "eyr", "hgt", "hcl", "ecl", "pid"];

const rules = {
  byr: (value) => isYear(value) && value >= 1920 && value <= 2002,
  iyr: (value) => isYear(value) && value >= 2010 && value <= 2020,
  eyr: (value) => isYear(value) && value >= 2020 && value <= 2030,
  hgt: (value) => {
    if (!/^[0-9]+(cm|in)$/.test(value)) {
      return false;
    }

    const number = Number(value);

    if (value.endsWith("cm")) {
      return number >= 150 && number <= 193;
    }

    return number >= 59 && number <= 76;
  },
  hcl: (value) => /^#[0-9a-f]{6}$/.test(value),
  ecl: (value) => /^(amb|blu|brn|gry|grn|hzl|oth)$/.test(value),
  pid: (value) => /^[0-9]{9}$/.test(value),
  cid: () => true,
};

function hasRequiredKeys(passport) {
  const keys = Object.keys(passport);

  return requiredKeys.reduce((acc, curr) => acc && keys.includes(curr), true);
}

function areKeysValid(passport) {
  return Object.keys(passport).reduce(
    (acc, curr) => acc && rules[curr](passport[curr]),
    true
  );
}

module.exports.processInput = (input) => {
  return input.split("\n\n").map((line) =>
    line.split(/\s+/).reduce((acc, curr) => {
      const [key, value] = curr.split(":");

      return {
        ...acc,
        [key]: value,
      };
    }, {})
  );
};

module.exports.part1 = (input) => {
  return input.reduce((acc, curr) => acc + hasRequiredKeys(curr), 0);
};

module.exports.part2 = (input) => {
  return input.reduce((acc, curr) => {
    return acc + (hasRequiredKeys(curr) && areKeysValid(curr));
  }, 0);
};
