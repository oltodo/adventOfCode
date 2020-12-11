function getCoords(path) {
  return path.reduce((acc, [direction, distance]) => {
    const [x = 0, y = 0] = acc[acc.length - 1] || [];

    switch (direction) {
      case "U":
        return [...acc, [x, y + distance]];
      case "D":
        return [...acc, [x, y - distance]];
      case "R":
        return [...acc, [x + distance, y]];
      case "L":
      default:
        return [...acc, [x - distance, y]];
    }
  }, []);
}

function normalizeLine([[x1, y1], [x2, y2]]) {
  if (x1 === x2) {
    return [
      [x1, Math.min(y1, y2)],
      [x1, Math.max(y1, y2)],
    ];
  }

  return [
    [Math.min(x1, x2), y1],
    [Math.max(x1, x2), y1],
  ];
}

function findIntersectionCoords(lineA, lineB) {
  const [[x1, y1], [x2, y2]] = normalizeLine(lineA);
  const [[x3, y3], [x4, y4]] = normalizeLine(lineB);

  if (x1 === x2 && y3 === y4) {
    if (x3 <= x1 && x4 >= x1 && y1 <= y3 && y2 >= y3) {
      return [x1, y3];
    }
  } else if (y1 === y2 && x3 === x4) {
    if (x1 <= x3 && x2 >= x3 && y3 <= y1 && y4 >= y1) {
      return [x3, y1];
    }
  }

  return null;
}

function getCrossLocations(coordsA, coordsB) {
  const coords = [];

  let currentA = [0, 0];
  let currentB = [0, 0];

  for (let i = 0; i < coordsA.length; i += 1) {
    for (let j = 0; j < coordsB.length; j += 1) {
      const intersectCoords = findIntersectionCoords(
        [currentA, coordsA[i]],
        [currentB, coordsB[j]]
      );

      if (intersectCoords) {
        coords.push(intersectCoords);
      }

      currentB = coordsB[j];
    }

    currentA = coordsA[i];
    currentB = [0, 0];
  }

  return coords.slice(1);
}

function getDistanceTo(steps, [x, y]) {
  let current = [0, 0];
  let distance = 0;

  for (let i = 0; i < steps.length; i += 1) {
    const [[x1, y1], [x2, y2]] = normalizeLine([current, steps[i]]);

    if (x >= x1 && x <= x2 && y >= y1 && y <= y2) {
      return (
        distance + Math.max(Math.abs(current[0] - x), Math.abs(current[1] - y))
      );
    }

    current = steps[i];
    distance += Math.max(Math.abs(x1 - x2), Math.abs(y1 - y2));
  }

  return 0;
}

module.exports.processInput = (input) => {
  return input.split("\n").map((line) =>
    line.split(",").map((item) => {
      const [, direction, distance] = /([A-Z])(\d+)/.exec(item);

      return [direction, parseInt(distance, 10)];
    })
  );
};

module.exports.part1 = (input) => {
  const coordsA = getCoords(input[0]);
  const coordsB = getCoords(input[1]);

  return getCrossLocations(coordsA, coordsB)
    .map(([x, y]) => Math.abs(x) + Math.abs(y))
    .reduce((acc, curr) => Math.min(acc, curr), Infinity);
};

module.exports.part2 = (input) => {
  const coordsA = getCoords(input[0]);
  const coordsB = getCoords(input[1]);
  const locations = getCrossLocations(coordsA, coordsB);

  return locations.reduce((acc, location) => {
    return Math.min(
      acc,
      getDistanceTo(coordsA, location) + getDistanceTo(coordsB, location)
    );
  }, Infinity);
};
