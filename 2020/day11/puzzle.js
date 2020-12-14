/* eslint-disable no-continue */

function copy(seats) {
  return [...seats.map((row) => [...row])];
}

function getStrictAdjacentSeats(seats, seatX, seatY) {
  const adjacentSeats = [];

  for (let i = 0; i < 9; i += 1) {
    if (i === 4) continue;

    const x = seatX + Math.floor(i / 3) - 1;
    const y = seatY + (i % 3) - 1;

    if (y in seats && x in seats[y] && seats[y][x] !== null) {
      adjacentSeats.push(seats[y][x]);
    }
  }

  return adjacentSeats;
}

function getOccupiedSeats(seats) {
  return seats.reduce((total, row) => {
    if (Array.isArray(row)) {
      return total + row.reduce((totalRow, seat) => totalRow + !!seat, 0);
    }

    return total + row;
  }, 0);
}

function getAdjacentSeats(seats, seatX, seatY) {
  const adjacentSeats = [];

  for (let i = 0; i <= 8; i += 1) {
    if (i === 4) continue;
    const direction = [Math.floor(i / 3) - 1, (i % 3) - 1];

    let nearerSeat = null;
    let distance = 1;
    while (nearerSeat === null) {
      const x = seatX + direction[0] * distance;
      const y = seatY + direction[1] * distance;

      if (!(y in seats) || !(x in seats[y])) {
        break;
      }
      if (seats[y][x] !== null) {
        nearerSeat = seats[y][x];
      }

      distance += 1;
    }

    if (nearerSeat !== null) {
      adjacentSeats.push(nearerSeat);
    }
  }

  return adjacentSeats;
}

module.exports.processInput = (input) => {
  return input
    .split("\n")
    .map((line) => line.split("").map((item) => (item === "." ? null : 1)));
};

module.exports.part1 = (input) => {
  const fn = (current) => {
    const next = copy(current);
    let changed = false;

    for (let y = 0; y < next.length; y += 1) {
      for (let x = 0; x < next[y].length; x += 1) {
        const seat = current[y][x];

        if (seat === null) continue;

        const adjacentSeats = getStrictAdjacentSeats(current, x, y);
        const occupied = getOccupiedSeats(adjacentSeats);

        if ((seat === 0 && occupied === 0) || (seat === 1 && occupied >= 4)) {
          next[y][x] = !next[y][x] + 0;
          changed = true;
        }
      }
    }

    if (changed) {
      return fn(next);
    }

    return current;
  };

  return getOccupiedSeats(fn(input));
};

module.exports.part2 = (input) => {
  const fn = (current) => {
    const next = copy(current);
    let changed = false;

    for (let y = 0; y < next.length; y += 1) {
      for (let x = 0; x < next[y].length; x += 1) {
        const seat = current[y][x];
        if (seat === null) continue;

        const adjacentSeats = getAdjacentSeats(current, x, y);
        const occupied = getOccupiedSeats(adjacentSeats);

        if ((seat === 0 && occupied === 0) || (seat === 1 && occupied >= 5)) {
          next[y][x] = !next[y][x] + 0;
          changed = true;
        }
      }
    }

    if (changed) {
      return fn(next);
    }

    return current;
  };

  return getOccupiedSeats(fn(input));
};
