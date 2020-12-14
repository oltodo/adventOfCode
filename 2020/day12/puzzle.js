module.exports.processInput = (input) => {
  return input.split("\n").map((line) => {
    const [, action, value] = /^([A-Z])(\d+)$/.exec(line);

    return [action, Number(value)];
  });
};

module.exports.part1 = (input) => {
  let currentDirection = [1, 0];

  const coords = input.reduce(
    (acc, curr) => {
      const [action, value] = curr;

      if (action === "F") {
        return [
          acc[0] + currentDirection[0] * value,
          acc[1] + currentDirection[1] * value,
        ];
      }

      if (action === "N") {
        return [acc[0], acc[1] + value];
      }
      if (action === "S") {
        return [acc[0], acc[1] - value];
      }
      if (action === "E") {
        return [acc[0] + value, acc[1]];
      }
      if (action === "W") {
        return [acc[0] - value, acc[1]];
      }

      if (action === "R" || action === "L") {
        const [x, y] = currentDirection;

        let angle = (Math.atan2(y, x) * 180) / Math.PI;
        angle += action === "R" ? -value : value;

        currentDirection = [
          Math.round(Math.cos((angle * Math.PI) / 180)),
          Math.round(Math.sin((angle * Math.PI) / 180)),
        ];
      }

      return acc;
    },
    [0, 0]
  );

  return Math.abs(coords[0]) + Math.abs(coords[1]);
};

module.exports.part2 = (input) => {
  let waypoint = [10, 1];

  const coords = input.reduce(
    (acc, curr) => {
      const [action, value] = curr;

      switch (action) {
        case "F": {
          return [acc[0] + waypoint[0] * value, acc[1] + waypoint[1] * value];
        }
        case "N": {
          waypoint = [waypoint[0], waypoint[1] + value];
          break;
        }
        case "S": {
          waypoint = [waypoint[0], waypoint[1] - value];
          break;
        }
        case "E": {
          waypoint = [waypoint[0] + value, waypoint[1]];
          break;
        }
        case "W": {
          waypoint = [waypoint[0] - value, waypoint[1]];
          break;
        }
        case "R":
        case "L": {
          const angle = ((value * Math.PI) / 180) * (action === "R" ? -1 : 1);
          waypoint = [
            Math.round(
              waypoint[0] * Math.cos(angle) - waypoint[1] * Math.sin(angle)
            ),
            Math.round(
              waypoint[0] * Math.sin(angle) + waypoint[1] * Math.cos(angle)
            ),
          ];
          break;
        }
        default:
      }

      return acc;
    },
    [0, 0]
  );

  return Math.abs(coords[0]) + Math.abs(coords[1]);
};
