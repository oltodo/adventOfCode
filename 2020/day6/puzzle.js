function flatten(arrays) {
  return arrays.reduce((acc, curr) => acc.concat(curr), []);
}

function intersection(arrays) {
  return arrays.reduce((acc, curr) =>
    acc.filter((item) => curr.includes(item))
  );
}

module.exports.processInput = (input) => {
  return input
    .split("\n\n")
    .map((group) => group.split("\n").map((line) => line.split("")));
};

module.exports.part1 = (input) => {
  return input.reduce((acc, group) => {
    const yes = [...new Set(flatten(group))];

    return acc + yes.length;
  }, 0);
};

module.exports.part2 = (input) => {
  return input.reduce((acc, group) => {
    const yes = intersection(group);

    return acc + yes.length;
  }, 0);
};
