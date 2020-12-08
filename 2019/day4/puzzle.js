const fs = require("fs");

const [min, max] = fs
  .readFileSync(`${__dirname}/input.txt`)
  .toString()
  .trim()
  .split("-")
  .map((item) => parseInt(item, 10));

function extractGroups(pwd) {
  const groups = [];
  const chars = pwd.split("");

  for (let prev = null, i = 0; i <= chars.length; i += 1) {
    const char = chars[i];

    if (char === prev) {
      groups[groups.length - 1] += 1;
    } else {
      groups.push(1);
    }

    prev = char;
  }

  return groups;
}

function upper(arr) {
  return arr.reduce((acc, curr) => Math.max(acc, curr), 0);
}

function isValid(pwd, part) {
  if (!/^[0-9]{6}$/.test(pwd)) {
    return false;
  }
  if (parseInt(pwd, 10) < min || parseInt(pwd, 10) > max) {
    return false;
  }
  if (!/(.)\1/.test(pwd)) {
    return false;
  }
  if (part === 2) {
    const groups = extractGroups(pwd);
    const bigger = upper(groups);

    if (bigger >= 3 && !groups.includes(2)) {
      return false;
    }
  }

  const chars = pwd.split("");
  for (let current = 0, i = 0; i <= chars.length; i += 1) {
    if (parseInt(chars[i], 10) < current) {
      return false;
    }

    current = chars[i];
  }

  return true;
}

function getAnswer(part) {
  let counter = 0;

  for (let i = min; i <= max; i += 1) {
    if (isValid(`${i}`, part)) {
      counter += 1;
    }
  }

  return counter;
}

const answer1 = getAnswer(1);
const answer2 = getAnswer(2);

module.exports = [answer1, answer2];
