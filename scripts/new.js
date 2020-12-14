#!/usr/bin/env node
const fs = require("fs");
const { exec } = require("child_process");
const mkdirp = require("mkdirp");
const isYear = require("../utils/isYear");

const now = new Date();

let year;
if (now.getMonth() < 11) {
  year = now.getFullYear() - 1;
} else {
  year = now.getFullYear();
}

let day;
if (now.getMonth() === 11 && now.getDate() < 26) {
  day = now.getDate();
} else {
  day = undefined;
}

process.argv.slice(2).forEach((arg) => {
  if (isYear(arg)) {
    year = arg;
    return;
  }

  if (/^[0-9]{1,2}$/.test(arg)) {
    day = arg;
  }
});

(async function main() {
  const rootPath = `${__dirname}/..`;
  const puzzlePath = `${rootPath}/${year}/day${day}`;

  await mkdirp(puzzlePath);

  const puzzleContent = `
module.exports.processInput = (input) => {};

module.exports.part1 = (input) => {};

module.exports.part2 = (input) => {};
`;

  const files = [
    [`${puzzlePath}/puzzle.js`, `${puzzleContent.trim()}\n`],
    [`${puzzlePath}/input.txt`, ""],
  ];

  files.forEach(([path, content]) => {
    if (!fs.existsSync(`${path}`)) {
      fs.writeFileSync(path, content);
    }
    exec(`code ${path}`);
  });
})();
