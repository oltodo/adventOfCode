const fs = require("fs");

const input = fs
  .readFileSync(`${__dirname}/input.txt`)
  .toString()
  .trim()
  .split("\n")
  .reduce((acc, curr) => {
    const [color, contain] = curr.split(" bags contain ");

    if (contain === "no other bags.") {
      return { ...acc, [color]: {} };
    }

    return {
      ...acc,
      [color]: contain
        .slice(0, -1)
        .split(", ")
        .reduce((acc2, curr2) => {
          const [number, color1, color2] = curr2.split(" ");

          return {
            ...acc2,
            [`${color1} ${color2}`]: parseInt(number, 10),
          };
        }, {}),
    };
  }, {});

function hasColor(color, items) {
  if (color in items) {
    return true;
  }

  return Object.keys(items).reduce((acc, key) => {
    // Stop searching
    if (acc === true) {
      return true;
    }

    return hasColor(color, input[key]);
  }, false);
}

function howManyBags(color, count = 0, level = 0) {
  return Object.keys(input[color]).reduce(
    (acc, curr) =>
      acc +
      input[color][curr] +
      input[color][curr] * howManyBags(curr, count, level + 1),
    count
  );
}

const answer1 = Object.keys(input).reduce((acc, key) => {
  return acc + hasColor("shiny gold", input[key]);
}, 0);

const answer2 = howManyBags("shiny gold");

module.exports = [answer1, answer2];
