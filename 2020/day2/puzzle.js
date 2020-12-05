const passwords = require("./input.json");

const answer1 = passwords.reduce((acc, curr) => {
  const [min, max, char, password] = curr;
  const reg = new RegExp(char, "g");
  const matches = password.match(reg) || [];

  if (matches.length >= min && matches.length <= max) {
    return acc + 1;
  }

  return acc;
}, 0);

const answer2 = passwords.reduce((acc, curr) => {
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

module.exports = [answer1, answer2];
