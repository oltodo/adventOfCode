function hasColor(input, color, items) {
  if (color in items) {
    return true;
  }

  return Object.keys(items).reduce((acc, key) => {
    // Stop searching
    if (acc === true) {
      return true;
    }

    return hasColor(input, color, input[key]);
  }, false);
}

function howManyBags(input, color, count = 0, level = 0) {
  return Object.keys(input[color]).reduce(
    (acc, curr) =>
      acc +
      input[color][curr] +
      input[color][curr] * howManyBags(input, curr, count, level + 1),
    count
  );
}

module.exports.processInput = (input) => {
  return input.split("\n").reduce((acc, curr) => {
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
            [`${color1} ${color2}`]: Number(number),
          };
        }, {}),
    };
  }, {});
};

module.exports.part1 = (input) => {
  return Object.keys(input).reduce((acc, key) => {
    return acc + hasColor(input, "shiny gold", input[key]);
  }, 0);
};

module.exports.part2 = (input) => {
  return howManyBags(input, "shiny gold");
};
