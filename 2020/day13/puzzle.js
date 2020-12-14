module.exports.processInput = (input) => {
  const [timestamp, busIds] = input.split("\n");

  return {
    timestamp: parseInt(timestamp, 10),
    busIds: busIds
      .split(",")
      .map((item) => (item === "x" ? null : Number(item))),
  };
};

module.exports.part1 = (input) => {
  const { timestamp, busIds } = input;

  return busIds
    .filter((id) => id !== null)
    .reduce(
      (acc, curr) => {
        const delay = curr - (timestamp % curr);

        return delay < acc[1] ? [curr, delay, curr * delay] : acc;
      },
      [0, Infinity]
    )[2];
};

module.exports.part2 = (input) => {
  const [firstId, ...busIds] = input.busIds;
  let multiplier = firstId;

  return busIds.reduce((t, id, index) => {
    if (id === null) {
      return t;
    }
    let next = t;
    while ((next + index + 1) % id !== 0) {
      next += multiplier;
    }
    multiplier *= id;

    return next;
  }, 0);
};
