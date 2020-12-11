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

module.exports.processInput = (input) => {
  return input.split("\n").map((line) => parseInt(line, 10));
};

module.exports.part1 = (input) => {
  return input.reduce((acc, curr) => acc + mass2Fuel(curr), 0);
};

module.exports.part2 = (input) => {
  return input.reduce((acc, curr) => acc + getFuelRequirement(curr), 0);
};
