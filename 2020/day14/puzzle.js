const expect = require("expect");

function sum(arr) {
  return arr.reduce((acc, curr) => {
    return acc + curr;
  }, 0);
}

function toDec(number) {
  return Number.parseInt(number, 2);
}

function toBin(number) {
  return Number(number).toString(2);
}

function to36bit(number) {
  return toBin(number).padStart(36, "0");
}

function applyMask1(bit36, mask) {
  let result = "";
  for (let i = 0; i < mask.length; i += 1) {
    if (mask[i] !== "X") {
      result += mask[i];
    } else {
      result += bit36[i];
    }
  }

  return result;
}

expect(
  applyMask1(
    "000000000000000000000000000000001011",
    "XXXXXXXXXXXXXXXXXXXXXXXXXXXXX1XXXX0X"
  )
).toEqual("000000000000000000000000000001001001");

expect(
  applyMask1(
    "000000000000000000000000000001100101",
    "XXXXXXXXXXXXXXXXXXXXXXXXXXXXX1XXXX0X"
  )
).toEqual("000000000000000000000000000001100101");

function applyMask2(bit36, mask) {
  let result = "";
  for (let i = 0; i < mask.length; i += 1) {
    if (mask[i] === "X") {
      result += "X";
    } else if (mask[i] === "1") {
      result += "1";
    } else {
      result += bit36[i];
    }
  }

  return result;
}

expect(
  applyMask2(
    "000000000000000000000000000000101010",
    "000000000000000000000000000000X1001X"
  )
).toEqual("000000000000000000000000000000X1101X");

expect(
  applyMask2(
    "000000000000000000000000000000011010",
    "00000000000000000000000000000000X0XX"
  )
).toEqual("00000000000000000000000000000001X0XX");

function getAddresses(floatingAddress) {
  const min = toDec(floatingAddress.replace(/X/g, "0"));

  return floatingAddress.split("").reduce(
    (acc, curr, index) => {
      if (curr !== "X") {
        return acc;
      }
      const weight = 2 ** (36 - index - 1);

      return acc.concat(acc.map((foo) => foo + weight));
    },
    [min]
  );
}

expect(getAddresses("00000000000000000000000000000001X0XX")).toEqual([
  16,
  24,
  18,
  26,
  17,
  25,
  19,
  27,
]);

/**
 * 1
 * 68421
 *
 * 0000X => 0, 1
 * 000X0 => 2, 3
 * 00X00 =>
 * 0X000 =>
 * X0000 =>
 */

module.exports.processInput = (input) => {
  return input.split("\n").map((line) => {
    if (line.startsWith("mask")) {
      return ["mask", line.split(" = ")[1]];
    }

    const [, address, value] = /^mem\[(\d+)] = (.+)$/.exec(line);

    return ["mem", Number(address), Number(value)];
  });
};

module.exports.part1 = (input) => {
  const mem = [];
  let mask;

  input.forEach(([action, ...data]) => {
    if (action === "mask") {
      [mask] = data;
      return;
    }

    const [address, value] = data;
    const bits = to36bit(value);
    const overridenBits = applyMask1(bits, mask);
    mem[address] = toDec(overridenBits);
  });

  return sum(mem);
};

module.exports.part2 = (input) => {
  const mem = {};
  let mask;

  input.forEach(([action, ...data]) => {
    if (action === "mask") {
      [mask] = data;
      return;
    }

    const [address, value] = data;
    const bits = to36bit(address);
    const overridenBits = applyMask2(bits, mask);
    const addresses = getAddresses(overridenBits);

    addresses.forEach((item) => {
      mem[item] = value;
    });
  });

  return sum(Object.values(mem));
};
