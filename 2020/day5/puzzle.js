const fs = require("fs");

const seats = fs
  .readFileSync(`${__dirname}/input.txt`)
  .toString()
  .trim()
  .split("\n");

function bisect(range, code) {
  return code.reduce((acc, curr) => {
    const [min, max] = acc;
    const half = (min + max) / 2;

    if (max - min === 1) {
      return curr === "F" || curr === "L" ? min : max;
    }

    if (curr === "F" || curr === "L") {
      return [min, Math.floor(half)];
    }

    return [Math.ceil(half), max];
  }, range);
}

function getSeatId(code) {
  const hp = code.split("");
  const vp = hp.splice(0, 7);

  const row = bisect([0, 127], vp);
  const column = bisect([0, 7], hp);

  return row * 8 + column;
}

const seatIds = seats.map(getSeatId).sort((a, b) => a - b);
const min = seatIds[0];
const max = seatIds[seatIds.length - 1];

const missing = seatIds.reduce((acc, curr, index) => {
  const next = seatIds[index + 1];

  if (next && next - curr > 1) {
    return curr + 1;
  }

  return acc;
}, min);

module.exports = [max, missing];
