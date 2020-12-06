const fs = require("fs");

const groups = fs
  .readFileSync(`${__dirname}/input.txt`)
  .toString()
  .trim()
  .split("\n\n")
  .map((group) => group.split("\n").map((line) => line.split("")));

function flatten(arrays) {
  return arrays.reduce((acc, curr) => acc.concat(curr), []);
}

function intersection(arrays) {
  return arrays.reduce((acc, curr) =>
    acc.filter((item) => curr.includes(item))
  );
}

const answer1 = groups.reduce((acc, group) => {
  const yes = [...new Set(flatten(group))];

  return acc + yes.length;
}, 0);

const answer2 = groups.reduce((acc, group) => {
  const yes = intersection(group);

  return acc + yes.length;
}, 0);

module.exports = [answer1, answer2];
