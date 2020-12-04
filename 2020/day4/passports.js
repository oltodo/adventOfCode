const fs = require("fs");

module.exports = fs
  .readFileSync(__dirname + "/passports.txt")
  .toString()
  .split("\n\n")
  .map((line) =>
    line.split(/\s+/).reduce((acc, curr) => {
      const [key, value] = curr.split(":");

      return {
        ...acc,
        [key]: value,
      };
    }, {})
  );
