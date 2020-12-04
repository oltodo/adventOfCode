const _ = require("lodash");
const passports = require("./passports");

function isYear(value) {
  return /^[0-9]{4}$/.test(value);
}

const requiredKeys = ["byr", "iyr", "eyr", "hgt", "hcl", "ecl", "pid"];

const rules = {
  byr: (value) => isYear(value) && value >= 1920 && value <= 2002,
  iyr: (value) => isYear(value) && value >= 2010 && value <= 2020,
  eyr: (value) => isYear(value) && value >= 2020 && value <= 2030,
  hgt: (value) => {
    if (!/^[0-9]+(cm|in)$/.test(value)) {
      return false;
    }

    const number = parseInt(value, 10);

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

const answer1 = passports.reduce((acc, curr) => acc + hasRequiredKeys(curr), 0);

const answer2 = passports.reduce((acc, curr) => {
  return acc + (hasRequiredKeys(curr) && areKeysValid(curr));
}, 0);

module.exports = [answer1, answer2];
