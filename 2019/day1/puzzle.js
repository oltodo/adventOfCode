const fs = require("fs");

const masses = fs
  .readFileSync(`${__dirname}/input.txt`)
  .toString()
  .trim()
  .split("\n")
  .map((line) => parseInt(line, 10));

function mass2Fuel(mass) {
  return Math.floor(mass / 3) - 2;
}

function getFuelRequirement(mass) {
  const fn = (current = mass, total = 0) => {
    const fuel = mass2Fuel(current);

    if (fuel <= 0) {
      return total;
    }

    return fn(fuel, total + fuel);
  };

  return fn();
}

const answer1 = masses.reduce((acc, curr) => acc + mass2Fuel(curr), 0);
const answer2 = masses.reduce((acc, curr) => acc + getFuelRequirement(curr), 0);

module.exports = [answer1, answer2];
